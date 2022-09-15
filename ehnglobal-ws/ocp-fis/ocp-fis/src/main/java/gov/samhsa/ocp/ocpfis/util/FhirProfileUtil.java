package gov.samhsa.ocp.ocpfis.util;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.C;
import org.hl7.fhir.r4.model.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class FhirProfileUtil {

    private static List<CanonicalType> convertListUriToCanonicalType(List<UriType> uriList){
       return uriList.stream().map(uriType -> {
            CanonicalType canonicalType = new CanonicalType();
            canonicalType.setValue(uriType.getValue());
            return canonicalType;
        }).collect(Collectors.toList());
    }

    public static void setAppointmentProfileMetaData(IGenericClient fhirClient, Appointment appointment) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Appointment.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            appointment.setMeta(meta);
        }
    }

    public static void setCareTeamProfileMetaData(IGenericClient fhirClient, CareTeam careTeam) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.CareTeam.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            careTeam.setMeta(meta);
        }
    }

    public static void setRelatedPersonProfileMetaData(IGenericClient fhirClient, RelatedPerson relatedPerson) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.RelatedPerson.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            relatedPerson.setMeta(meta);
        }
    }

    public static void setHealthCareServiceProfileMetaData(IGenericClient fhirClient, HealthcareService healthcareService){
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.HealthcareService.toString());
        if(uriList !=null && !uriList.isEmpty()){
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            healthcareService.setMeta(meta);
        }
    }

    public static void setLocationProfileMetaData(IGenericClient fhirClient, Location fhirLocation) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Location.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            fhirLocation.setMeta(meta);
        }
    }

    public static void setOrganizationProfileMetaData(IGenericClient fhirClient, Organization organization) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Organization.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            organization.setMeta(meta);
        }
    }

    public static void setActivityDefinitionProfileMetaData(IGenericClient fhirClient, ActivityDefinition activityDefinition) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.ActivityDefinition.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            activityDefinition.setMeta(meta);
        }
    }

    public static void setPractitionerProfileMetaData(IGenericClient fhirClient, Practitioner practitioner) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Practitioner.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            practitioner.setMeta(meta);
        }
    }

    public static void setPractitionerRoleProfileMetaData(IGenericClient fhirClient, PractitionerRole practitionerRole) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.PractitionerRole.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            practitionerRole.setMeta(meta);
        }
    }

    public static void setCommunicationProfileMetaData(IGenericClient fhirClient, Communication communication) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Communication.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            communication.setMeta(meta);
        }
    }

    public static void setTaskProfileMetaData(IGenericClient fhirClient, Task task) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Task.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            task.setMeta(meta);
        }
    }

    public static void setCoverageProfileMetaData(IGenericClient fhirClient, Coverage coverage) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Coverage.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            coverage.setMeta(meta);
        }
    }

    public static void setConsentProfileMetaData(IGenericClient fhirClient, Consent consent) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Consent.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            consent.setMeta(meta);
        }
    }

    public static void setPatientProfileMetaData(IGenericClient fhirClient, Patient patient) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Patient.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            patient.setMeta(meta);
        }
    }

    public static void setPersonProfileMetaData(IGenericClient fhirClient, Person person) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Person.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            person.setMeta(meta);
        }
    }

    public static void setFlagProfileMetaData(IGenericClient fhirClient, Flag flag) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.Flag.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            flag.setMeta(meta);
        }
    }

    public static void setEpisodeOfCareProfileMetaData(IGenericClient fhirClient, EpisodeOfCare episodeOfCare) {
        List<UriType> uriList = FhirOperationUtil.getURIList(fhirClient, ResourceType.EpisodeOfCare.toString());
        if (uriList != null && !uriList.isEmpty()) {
            Meta meta = new Meta().setProfile(convertListUriToCanonicalType(uriList));
            episodeOfCare.setMeta(meta);
        }
    }
}
