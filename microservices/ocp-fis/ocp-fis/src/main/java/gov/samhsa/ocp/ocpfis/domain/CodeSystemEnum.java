package gov.samhsa.ocp.ocpfis.domain;

import java.util.Arrays;

public enum CodeSystemEnum {

    // Common Systems
    ADMINISTRATIVE_GENDER("ValueSet/administrative-gender"),
    //ETHNICITY("urn:oid:2.16.840.1.113883.6.238"),
    ETHNICITY("http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity"),
    LANGUAGE("urn:ietf:bcp:47"),
    LANGUAGES("http://hl7.org/fhir/ValueSet/languages"),
    RACE("urn:oid:2.16.840.1.113883.6.238"),
//    RACE("http://hl7.org/fhir/us/core/StructureDefinition/us-core-race"),

    // Resource Specific (Organize in Alphabetical order)
    APPOINTMENT_PARTICIPATION_TYPE("http://terminology.hl7.org/CodeSystem/v3-ParticipationType"),
    CARETEAM_REASON("http://snomed.info/sct"),
    CARETEAM_PARTICIPANT("https://nucc.org/provider-taxonomy"),
    CARETEAM_CATEGORY("http://loinc.org"),
    PROVENANCE_ACTIVITY_TYPE("http://hl7.org/fhir/v3/DataOperation"),
    PROVIDER_ROLE("http://hl7.org/fhir/practitioner-role"),
    PROVIDER_SPECIALTY("http://snomed.info/sct"),
    RELATED_PERSON_PATIENT_RELATIONSHIP_PATH_1("http://terminology.hl7.org/CodeSystem/v3-RoleCode"),
    RELATED_PERSON_PATIENT_RELATIONSHIP_PATH_2("http://terminology.hl7.org/CodeSystem/v2-0131"),
    COVERAGE_TYPE("http://terminology.hl7.org/CodeSystem/v3-ActCode");

    private final String url;

    CodeSystemEnum(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public static boolean contains(String s) {
        return Arrays.stream(values()).anyMatch(ProfileURLEnum -> ProfileURLEnum.name().equalsIgnoreCase(s));
    }
}
