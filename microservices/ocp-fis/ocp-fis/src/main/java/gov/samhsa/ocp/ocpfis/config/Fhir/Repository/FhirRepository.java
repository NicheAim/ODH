package gov.samhsa.ocp.ocpfis.config.Fhir.Repository;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.ocpfis.config.FisProperties;

public interface FhirRepository {
    IGenericClient getClient(FhirContext fhirContext, FisProperties fisProperties);
}
