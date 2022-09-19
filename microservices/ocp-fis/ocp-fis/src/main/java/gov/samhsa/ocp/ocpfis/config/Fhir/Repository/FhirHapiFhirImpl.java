package gov.samhsa.ocp.ocpfis.config.Fhir.Repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Component;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IClientInterceptor;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.BearerToken.Repository.BearerTokenHapiFhirImpl;

@Component("FhirHapiFhirImpl")
public class FhirHapiFhirImpl implements FhirRepository {

    private final FisProperties fisProperties;

    private Optional<OAuth2RestTemplate> oAuth2RestTemplate;

    @Autowired
    public FhirHapiFhirImpl(FisProperties fisProperties, Optional<OAuth2RestTemplate> oAuth2RestTemplate) {
        this.fisProperties = fisProperties;
        this.oAuth2RestTemplate = oAuth2RestTemplate;
    }

    @Override
    public IGenericClient getClient(FhirContext fhirContext, FisProperties fisProperties) {
        IGenericClient fhirClient = fhirContext.newRestfulGenericClient(fisProperties.getFhir().getServerUrl());
        if (fisProperties.getFhir().isServerSecurityEnabled() && oAuth2RestTemplate.isPresent()) {
            IClientInterceptor authInterceptor = new BearerTokenHapiFhirImpl(oAuth2RestTemplate.get());
            fhirClient.registerInterceptor(authInterceptor);
        }
        return fhirClient;
    }
}
