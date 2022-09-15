package gov.samhsa.ocp.smartcore.service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;

public interface FhirServiceClient {
    IGenericClient getClient(FhirContext fhirContext);
}