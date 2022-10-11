package gov.samhsa.ocp.ocpfis.config.Fhir;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.config.Fhir.Repository.FhirRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OptionalFhirserver {
    // TODO: make autowiring to instance based on config properties
    private FhirRepository proxyfhirRepository;
    private FhirRepository hapiFhirRepository;
    private FhirRepository gcpFhirRepository;

    @Autowired
    public OptionalFhirserver(@Qualifier("FhirHapiFhirImpl") FhirRepository hapiFhirRepository) {
        this.hapiFhirRepository = hapiFhirRepository;
    }

    public IGenericClient getClient(FhirContext fhirContext, FisProperties fisProperties) {
            log.info("Connecting to HAPI FHIR...");
            log.info("SERVER URL: " + fisProperties.getFhir().getServerUrl());
            return hapiFhirRepository.getClient(fhirContext, fisProperties);
    }

}