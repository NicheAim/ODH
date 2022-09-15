package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.domain.ProvenanceActivityEnum;
import gov.samhsa.ocp.ocpfis.domain.SearchKeyEnum;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.RelatedPersonDto;
import gov.samhsa.ocp.ocpfis.service.exception.DuplicateResourceFoundException;
import gov.samhsa.ocp.ocpfis.service.exception.FHIRClientException;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpfis.service.mapping.RelatedPersonToRelatedPersonDtoConverter;
import gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel.RelatedPersonDtoToRelatedPersonConverter;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.FhirProfileUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import gov.samhsa.ocp.ocpfis.util.RichStringClientParam;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.RelatedPerson;
import org.hl7.fhir.r4.model.ResourceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class RelatedPersonServiceImpl implements RelatedPersonService {

    private final IGenericClient fhirClient;
    private final FhirValidator fhirValidator;
    private final FisProperties fisProperties;
    private final ProvenanceUtil provenanceUtil;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    @Autowired
    public RelatedPersonServiceImpl(IGenericClient fhirClient, FhirValidator fhirValidator, FisProperties fisProperties, ProvenanceUtil provenanceUtil, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.fhirClient = fhirClient;
        this.fhirValidator = fhirValidator;
        this.fisProperties = fisProperties;
        this.provenanceUtil = provenanceUtil;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public PageDto<RelatedPersonDto> searchRelatedPersons(String patientId, Optional<String> searchKey, Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber, Optional<Integer> pageSize, Optional<Boolean> showAll) {
        int numberPerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.RelatedPerson.name());

        IQuery relatedPersonIQuery = fhirClient.search().forResource(RelatedPerson.class).where(new ReferenceClientParam("patient").hasId("Patient/" + patientId));

        //Set Sort order
        relatedPersonIQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(relatedPersonIQuery, true);
        if (searchKey.isPresent() && searchValue.isPresent()) {
            if (searchKey.get().equalsIgnoreCase(SearchKeyEnum.RelatedPersonSearchKey.NAME.name())) {
                relatedPersonIQuery.where(new RichStringClientParam("name").contains().value(searchValue.get().trim()));

            } else if (searchKey.get().equalsIgnoreCase(SearchKeyEnum.CommonSearchKey.IDENTIFIER.name())) {
                relatedPersonIQuery.where((new TokenClientParam(searchKey.get()).exactly().code(searchValue.get().trim())));

            }
        }

        Bundle firstPageBundle;
        Bundle otherPageBundle;
        boolean firstPage = true;

        firstPageBundle = (Bundle) relatedPersonIQuery.count(numberPerPage).returnBundle(Bundle.class).execute();

        if (firstPageBundle == null || firstPageBundle.getEntry().size() < 1) {
            log.info("No RelatedPerson was found for the given criteria");
            return new PageDto<>(new ArrayList<>(), numberPerPage, 0, 0, 0, 0);
        }

        if (showAll.isPresent() && showAll.get()) {
            List<RelatedPersonDto> patientDtos = convertAllBundleToSingleRelatedPersonDtoList(firstPageBundle, numberPerPage);
            return (PageDto<RelatedPersonDto>) PaginationRepository.applyPaginationForCustomArrayList(patientDtos, patientDtos.size(), Optional.of(1), false);
        }
        

        otherPageBundle = firstPageBundle;

        if (pageNumber.isPresent() && pageNumber.get() > 1) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            } else {
                otherPageBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, pageNumber.get(), numberPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> relatedPersons = otherPageBundle.getEntry();

        List<RelatedPersonDto> relatedPersonList = relatedPersons.stream().map(this::convertToRelatedPerson).collect(toList());

        double totalPages = Math.ceil((double) otherPageBundle.getTotal() / numberPerPage);
        int currentPage = firstPage ? 1 : pageNumber.get();

        return new PageDto<>(relatedPersonList, numberPerPage, totalPages, currentPage, relatedPersonList.size(), otherPageBundle.getTotal());
    }

    @Override
    public RelatedPersonDto getRelatedPersonById(String relatedPersonId) {
        Bundle relatedPersonBundle = fhirClient.search().forResource(RelatedPerson.class)
                .where(new TokenClientParam("_id").exactly().code(relatedPersonId))
                .returnBundle(Bundle.class)
                .execute();

        if (relatedPersonBundle == null || relatedPersonBundle.getEntry().isEmpty()) {
            throw new ResourceNotFoundException("No RelatedPerson was found for the given RelatedPersonID : " + relatedPersonId);
        }

        Bundle.BundleEntryComponent relatedPersonBundleEntry = relatedPersonBundle.getEntry().get(0);
        RelatedPerson relatedPerson = (RelatedPerson) relatedPersonBundleEntry.getResource();

        return RelatedPersonToRelatedPersonDtoConverter.map(relatedPerson);
    }

    @Override
    public void createRelatedPerson(RelatedPersonDto relatedPersonDto, Optional<String> loggedInUser) {
        List<String> idList = new ArrayList<>();
        log.info("Saving Related Person");
        checkForDuplicates(relatedPersonDto, relatedPersonDto.getPatient());
        relatedPersonDto.setActive(true);
        try {
            final RelatedPerson relatedPerson = RelatedPersonDtoToRelatedPersonConverter.map(relatedPersonDto);

            //Set Profile Meta Data
            FhirProfileUtil.setRelatedPersonProfileMetaData(fhirClient, relatedPerson);

            //Validate
            FhirOperationUtil.validateFhirResource(fhirValidator, relatedPerson, Optional.empty(), ResourceType.RelatedPerson.name(), "Create RelatedPerson");

            //Create
            MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, relatedPerson, ResourceType.RelatedPerson.name());
            idList.add(ResourceType.RelatedPerson.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

            if(fisProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, loggedInUser);
            }

        } catch (ParseException e) {

            throw new FHIRClientException("FHIR Client returned with an error while creating a RelatedPerson : " + e.getMessage());

        }
    }

    @Override
    public void updateRelatedPerson(String relatedPersonId, RelatedPersonDto relatedPersonDto, Optional<String> loggedInUser) {
        List<String> idList = new ArrayList<>();

        relatedPersonDto.setRelatedPersonId(relatedPersonId);
        try {
            final RelatedPerson relatedPerson = RelatedPersonDtoToRelatedPersonConverter.map(relatedPersonDto);

            //Set Profile Meta Data
            FhirProfileUtil.setRelatedPersonProfileMetaData(fhirClient, relatedPerson);

            //Validate
            FhirOperationUtil.validateFhirResource(fhirValidator, relatedPerson, Optional.of(relatedPersonId), ResourceType.RelatedPerson.name(), "Update RelatedPerson");

            //Update the resource
            MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, relatedPerson, "Update RelatedPerson");
            idList.add(ResourceType.RelatedPerson.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

            if(fisProperties.isProvenanceEnabled()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.UPDATE, loggedInUser);
            }

        } catch (ParseException e) {

            throw new FHIRClientException("FHIR Client returned with an error while creating a RelatedPerson : " + e.getMessage());

        }
    }

    private void checkForDuplicates(RelatedPersonDto relatedPersonDto, String patientId) {
        Bundle relatedPersonBundle = (Bundle) FhirOperationUtil.setNoCacheControlDirective(fhirClient.search().forResource(RelatedPerson.class)
                .where(RelatedPerson.IDENTIFIER.exactly().systemAndIdentifier(relatedPersonDto.getIdentifierType(), relatedPersonDto.getIdentifierValue()))
                .where(new TokenClientParam("patient").exactly().code(patientId)))
                .returnBundle(Bundle.class)
                .execute();
        log.info("Existing RelatedPersons size : " + relatedPersonBundle.getEntry().size());

        if (!relatedPersonBundle.getEntry().isEmpty()) {
            throw new DuplicateResourceFoundException("RelatedPerson already exists with the given Identifier Type and Identifier Value");
        } else {
            Bundle rPBundle = (Bundle) FhirOperationUtil.setNoCacheControlDirective(fhirClient.search().forResource(RelatedPerson.class)
                    .where(new TokenClientParam("patient").exactly().code(patientId)))
                    .returnBundle(Bundle.class)
                    .execute();

            if (!FhirOperationUtil.getAllBundleComponentsAsList(rPBundle, Optional.empty(), fhirClient, fisProperties).stream().filter(relatedP -> {
                RelatedPerson rp = (RelatedPerson) relatedP.getResource();
                return rp.getIdentifier().stream().anyMatch(identifier -> identifier.getSystem().equalsIgnoreCase(relatedPersonDto.getIdentifierType()) && identifier.getValue().replaceAll(" ", "")
                        .replaceAll("-", "").trim()
                        .equalsIgnoreCase(relatedPersonDto.getIdentifierValue().replaceAll(" ", "").replaceAll("-", "").trim()));
            }).collect(toList()).isEmpty()) {
                throw new DuplicateResourceFoundException("RelatedPerson already exists with the given Identifier Type and Identifier Value");
            }
        }
    }

    private RelatedPersonDto convertToRelatedPerson(Bundle.BundleEntryComponent bundleEntryComponent) {
        return RelatedPersonToRelatedPersonDtoConverter.map((RelatedPerson) bundleEntryComponent.getResource());
    }

    private List<RelatedPersonDto> convertAllBundleToSingleRelatedPersonDtoList(Bundle firstPageSearchBundle, int numberOBundlePerPage) {
        return FhirOperationUtil.getAllBundleComponentsAsList(firstPageSearchBundle, Optional.of(numberOBundlePerPage), fhirClient, fisProperties)
                .stream().map(this::convertToRelatedPerson)
                .collect(toList());
    }

}
