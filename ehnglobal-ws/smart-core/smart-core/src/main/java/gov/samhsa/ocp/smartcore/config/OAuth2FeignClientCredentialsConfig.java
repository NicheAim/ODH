package gov.samhsa.ocp.smartcore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.OAuth2ClientProperties;
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;

// DO NOT add @Configuration unless this needs to globally apply to all Feign Clients
public class OAuth2FeignClientCredentialsConfig {

    @Value("${security.oauth2.client.access-token-uri}")
    private String accessTokenUri;

    @Bean
    public ClientCredentialsResourceDetails clientCredentialsResourceDetails(OAuth2ClientProperties oAuth2ClientProperties) {
        ClientCredentialsResourceDetails clientCredentialsResourceDetails = new ClientCredentialsResourceDetails();
        clientCredentialsResourceDetails.setAccessTokenUri(accessTokenUri);
        clientCredentialsResourceDetails.setClientId(oAuth2ClientProperties.getClientId());
        clientCredentialsResourceDetails.setClientSecret(oAuth2ClientProperties.getClientSecret());
        return clientCredentialsResourceDetails;
    }

    @Bean
    public OAuth2FeignRequestInterceptor oAuth2FeignRequestInterceptor(OAuth2ClientContext oAuth2ClientContext, ClientCredentialsResourceDetails resource) {
        return new OAuth2FeignRequestInterceptor(oAuth2ClientContext, resource);
    }
}
