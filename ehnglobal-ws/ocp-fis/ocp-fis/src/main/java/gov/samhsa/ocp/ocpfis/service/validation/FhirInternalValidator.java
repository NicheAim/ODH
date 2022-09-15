package gov.samhsa.ocp.ocpfis.service.validation;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
public class FhirInternalValidator {

    public FhirInternalValidator() {}

    public FhirValidator resourcevalidator(@NotNull FisProperties fisProperties){
        FhirContext fhirContextinternal = FhirContext.forR4();
        fhirContextinternal.getRestfulClientFactory().setSocketTimeout(Integer.parseInt(fisProperties.getFhir().getClientSocketTimeoutInMs()));
        FhirValidator fhirValidatorinternal = fhirContextinternal.newValidator();
        return fhirValidatorinternal;
    }
}
