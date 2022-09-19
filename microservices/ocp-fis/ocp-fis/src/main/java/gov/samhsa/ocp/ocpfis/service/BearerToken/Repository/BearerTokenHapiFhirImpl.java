package gov.samhsa.ocp.ocpfis.service.BearerToken.Repository;

import ca.uhn.fhir.rest.api.Constants;
import ca.uhn.fhir.rest.client.api.IClientInterceptor;
import ca.uhn.fhir.rest.client.api.IHttpRequest;
import ca.uhn.fhir.rest.client.api.IHttpResponse;
import lombok.Data;
import org.apache.commons.lang3.Validate;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;

import java.io.IOException;

@Data
public class BearerTokenHapiFhirImpl implements IClientInterceptor {
    private OAuth2RestTemplate oAuth2RestTemplate;

    public BearerTokenHapiFhirImpl(OAuth2RestTemplate myOAuth2RestTemplate) {
        Validate.notNull(myOAuth2RestTemplate);
        oAuth2RestTemplate = myOAuth2RestTemplate;
    }

    @Override
    public void interceptRequest(IHttpRequest iHttpRequest) {
        // TODO set auhtorization header if needed
       // iHttpRequest.addHeader(Constants.HEADER_AUTHORIZATION, (Constants.HEADER_AUTHORIZATION_VALPREFIX_BEARER + oAuth2RestTemplate.getAccessToken().getValue()));
    }

    @Override
    public void interceptResponse(IHttpResponse theResponse) throws IOException {

    }
}
