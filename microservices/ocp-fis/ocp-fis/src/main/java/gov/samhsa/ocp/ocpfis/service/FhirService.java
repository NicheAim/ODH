package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.client.api.IGenericClient;

public interface FhirService {
    IGenericClient getClient();
}