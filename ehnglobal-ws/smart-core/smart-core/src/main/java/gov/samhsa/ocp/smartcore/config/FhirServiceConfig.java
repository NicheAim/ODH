package gov.samhsa.ocp.smartcore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.smartcore.service.FhirServiceClient;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class FhirServiceConfig {
    private SmartCoreProperties smartCoreProperties;
    private FhirServiceClient fhirProxyService;
    private FhirServiceClient ghaService;
    private FhirServiceClient hapiService;

    @Autowired
    public FhirServiceConfig(
            SmartCoreProperties smartCoreProperties,
            @Qualifier("FhirServiceClientHapiImpl") FhirServiceClient hapiService) {
        this.smartCoreProperties = smartCoreProperties;
        this.hapiService = hapiService;
    }

    @Bean
    public FhirContext fhirContext() {
        FhirContext fhirContext = FhirContext.forR4();
        fhirContext.getRestfulClientFactory()
                .setSocketTimeout(Integer.parseInt(smartCoreProperties.getClient_socket_timeout_in_ms()));
        return fhirContext;
    }

    @Bean
    public IGenericClient fhirClient() {
        String dataStoreTech = smartCoreProperties.getData_store_tech();
        log.info("Connecting to Fhir Server...");
        log.info("Using datastore tech: " + dataStoreTech);
        log.info("SERVER URL: " + smartCoreProperties.getFhir());

        if (dataStoreTech.equals("hapi")) {
            return hapiService.getClient(fhirContext());
        }

        return null;
    }

    @Bean
    public IParser fhirJsonParser() {
        return fhirContext().newJsonParser();
    }
}
