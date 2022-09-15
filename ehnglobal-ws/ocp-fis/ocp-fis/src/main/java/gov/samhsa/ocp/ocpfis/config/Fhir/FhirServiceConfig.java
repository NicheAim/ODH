package gov.samhsa.ocp.ocpfis.config.Fhir;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.common.hapi.validation.validator.FhirInstanceValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class FhirServiceConfig {

    private final FisProperties fisProperties;
    private OptionalFhirserver optionalFhirserver;

    @Autowired
    public FhirServiceConfig(FisProperties fisProperties, OptionalFhirserver optionalFhirserver) {
        this.fisProperties = fisProperties;
        this.optionalFhirserver = optionalFhirserver;
    }

    @Bean
    public FhirContext fhirContext() {
        FhirContext fhirContext = FhirContext.forR4();
        fhirContext.getRestfulClientFactory().setSocketTimeout(Integer.parseInt(fisProperties.getFhir().getClientSocketTimeoutInMs()));
        return fhirContext;
    }

    @Bean
    public IGenericClient fhirClient() {
        return optionalFhirserver.getClient(fhirContext(), fisProperties);
    }

    @Bean
    public IParser fhirJsonParser() {
        return fhirContext().newJsonParser();
    }

    @Bean
    public FhirValidator fhirValidator() {
        FhirValidator fhirValidator = fhirContext().newValidator();
        FhirInstanceValidator instanceValidator = new FhirInstanceValidator(fhirContext());
        instanceValidator.setValidationSupport(fhirContext().getValidationSupport());
        instanceValidator.setErrorForUnknownProfiles(false);
        fhirValidator.registerValidatorModule(instanceValidator);
        return fhirValidator;
    }

}
