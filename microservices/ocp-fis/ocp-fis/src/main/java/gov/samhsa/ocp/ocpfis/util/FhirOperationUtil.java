package gov.samhsa.ocp.ocpfis.util;

import ca.uhn.fhir.rest.api.CacheControlDirective;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.rest.server.exceptions.BaseServerResponseException;
import ca.uhn.fhir.validation.FhirValidator;
import ca.uhn.fhir.validation.SingleValidationMessage;
import ca.uhn.fhir.validation.ValidationResult;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.domain.StructureDefinitionEnum;
import gov.samhsa.ocp.ocpfis.service.exception.FHIRClientException;
import gov.samhsa.ocp.ocpfis.service.exception.FHIRFormatErrorException;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.DomainResource;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.StructureDefinition;
import org.hl7.fhir.r4.model.UriType;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static ca.uhn.fhir.rest.api.Constants.PARAM_LASTUPDATED;

@Slf4j
public class FhirOperationUtil {
    public static final int PAGE_NUMBER = 2;

    public static boolean isStringNotNullAndNotEmpty(String givenString) {
        return givenString != null && !givenString.trim().isEmpty();
    }

    public static boolean isStringNullOrEmpty(String givenString) {
        return givenString == null || givenString.trim().isEmpty();
    }

    public static void validateFhirResource(FhirValidator fhirValidator, DomainResource fhirResource,
                                            Optional<String> fhirResourceId, String fhirResourceName,
                                            String actionAndResourceName) {
        try {
            ValidationResult validationResult = fhirValidator.validateWithResult(fhirResource);

            if (fhirResourceId.isPresent()) {
                log.info(actionAndResourceName + " : " + "Validation successful? " + validationResult.isSuccessful() + " for " + fhirResourceName + " Id: " + fhirResourceId);
            } else {
                log.info(actionAndResourceName + " : " + "Validation successful? " + validationResult.isSuccessful());
            }

            if (!validationResult.isSuccessful()) {
                log.info("Listing the issues found when validating the " + fhirResourceName + "(" + actionAndResourceName + ") :");
                fhirResourceId.ifPresent(s -> log.info("FHIR Resource ID: " + s));
                // Show the issues
                for (SingleValidationMessage next : validationResult.getMessages()) {
                    log.error("Next issue (" + next.getSeverity() + ") - " + next.getLocationString() + " - " + next.getMessage());
                }
                throw new FHIRFormatErrorException(fhirResourceName + " validation was not successful" + validationResult.getMessages());
            }
        } catch (Exception e) {
            log.error("Unidentified Exception", e);
            return;
        }
    }

    public static MethodOutcome createFhirResource(IGenericClient fhirClient, DomainResource fhirResource, String fhirResourceName) {
        try {
            MethodOutcome serverResponse = fhirClient.create().resource(fhirResource).execute();
            log.info("ID Created: "+serverResponse.getId().getValue());
            log.info("Created a new " + fhirResourceName + " : " + serverResponse.getId().getIdPart());
            return serverResponse;
        } catch (BaseServerResponseException e) {
            log.info(e.getMessage());
            log.error("Could NOT create " + fhirResourceName);
            throw new FHIRClientException("FHIR Client returned with an error while creating the " + fhirResourceName + " : " + e.getMessage());
        }
    }

    public static MethodOutcome updateFhirResource(IGenericClient fhirClient, DomainResource fhirResource, String actionAndResourceName) {
        try {
            MethodOutcome serverResponse = fhirClient.update().resource(fhirResource).execute();
            log.info(actionAndResourceName + " was successful for Id: " + serverResponse.getId().getIdPart());
            return serverResponse;
        } catch (BaseServerResponseException e) {
            log.error("Could NOT " + actionAndResourceName + " with Id: " + fhirResource.getIdElement().getIdPart());
            log.error(e.getMessage());
            throw new FHIRClientException("FHIR Client returned with an error during" + actionAndResourceName + " : " + e.getMessage());
        }
    }

    public static IQuery setNoCacheControlDirective(IQuery searchQuery) {
        final CacheControlDirective cacheControlDirective = new CacheControlDirective();
        cacheControlDirective.setNoCache(true);
        searchQuery.cacheControl(cacheControlDirective);
        return searchQuery;
    }

    public static IQuery searchNoCache(IGenericClient fhirClient, Class resourceType, Optional<Boolean> sortByLastUpdatedTimeDesc) {
        IQuery iQuery;
        if (sortByLastUpdatedTimeDesc.isPresent() && sortByLastUpdatedTimeDesc.get()) {
            iQuery = fhirClient.search().forResource(resourceType).sort().descending(PARAM_LASTUPDATED);
        } else {
            iQuery = fhirClient.search().forResource(resourceType);
        }
        return setNoCacheControlDirective(iQuery);
    }

    public static IQuery setLastUpdatedTimeSortOrder(IQuery searchQuery, Boolean isDescending) {
        if (isDescending) {
            searchQuery.sort().descending(PARAM_LASTUPDATED);
        } else {
            searchQuery.sort().ascending(PARAM_LASTUPDATED);
        }
        return searchQuery;
    }

    public static List<Bundle.BundleEntryComponent> getAllBundleComponentsAsList(Bundle bundle, Optional<Integer> countSize, IGenericClient fhirClient, FisProperties fisProperties) {
//        int pageNumber = PAGE_NUMBER;
//        int pageSize = countSize.orElse(fisProperties.getFhir().getDefaultResourceBundlePageSize());
        Bundle updatedBundle = bundle;
        List<Bundle.BundleEntryComponent> bundleEntryComponents = new ArrayList<>();
        if (!bundle.getEntry().isEmpty()) {
            bundleEntryComponents.addAll(bundle.getEntry());

            while (updatedBundle.getLink(Bundle.LINK_NEXT) != null) {
                String pageUrl = updatedBundle.getLink(Bundle.LINK_NEXT).getUrl();
                updatedBundle = fhirClient.search().byUrl(pageUrl).returnBundle(Bundle.class).execute();
                bundleEntryComponents.addAll(updatedBundle.getEntry());
            }
        }
        return bundleEntryComponents;
    }

    public static List<UriType> getURIList(IGenericClient fhirClient, String resource) {
        Bundle structureDefinitionBundle = null;

        switch (resource.toUpperCase()) {
            case "APPOINTMENT":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Appointment"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "CARETEAM":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("CareTeam"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "COMMUNICATION":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Communication"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "CONSENT":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Consent"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "COVERAGE":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Coverage"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "EPISODEOFCARE":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("EpisodeOfCare"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "FLAG":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Flag"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "HEALTHCARESERVICE":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("HealthcareService"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "LOCATION":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Location"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "ORGANIZATION":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Organization"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "PATIENT":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Patient"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "PERSON":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Person"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "PRACTITIONER":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Practitioner"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "PRACTITIONERROLE":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("PractitionerRole"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "RELATEDPERSON":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("RelatedPerson"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            case "TASK":
                structureDefinitionBundle = fhirClient.search().forResource(StructureDefinition.class)
                        .where(new TokenClientParam("type").exactly().code("Task"))
                        .returnBundle(Bundle.class)
                        .execute();
                break;
            default:

        }

        if (structureDefinitionBundle != null && !structureDefinitionBundle.getEntry().isEmpty()) {
            //First check in server
            log.info("Number of Structure Definitions found:" + structureDefinitionBundle.getTotal() + " for " + resource);

            List<StructureDefinition> structureDefinitionList = structureDefinitionBundle.getEntry().stream()
                    .filter(bundle -> bundle.getResource().getResourceType().equals(ResourceType.StructureDefinition))
                    .map(structureDefinition -> (StructureDefinition) structureDefinition.getResource())
                    .collect(Collectors.toList());
            return structureDefinitionList.stream().map(StructureDefinition::getUrlElement).collect(Collectors.toList());
        } else {
            //Return URI List from ENUM
            log.info("No StructureDefinition found...Getting URL from ENUM for " + resource);
            try {
                String url = StructureDefinitionEnum.valueOf(resource.toUpperCase()).getUrl();
                if (url != null && !url.isEmpty()) {
                    return Collections.singletonList(new UriType(url));
                }
            } catch (Exception e) {
                log.error("Neither StructureDefinition nor ENUM constant found");
                // Don't get stuck here
                return null;
            }
        }
        return null;
    }

    public static String getFhirId(MethodOutcome methodOutcome) {
        if (methodOutcome != null) {
            return methodOutcome.getId().getIdPart();
        }
        return null;
    }
}

