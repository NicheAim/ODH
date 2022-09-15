package gov.samhsa.ocp.ocpuiapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.OAuth2ClientProperties;
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.token.DefaultAccessTokenRequest;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

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
    @Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
    public DefaultOAuth2ClientContext oauth2ClientCredentialsContext() {
        final DefaultOAuth2ClientContext context = new DefaultOAuth2ClientContext(
                new DefaultAccessTokenRequest());
        return context;
    }

    /**
     * Hard-wire {@link #oauth2ClientCredentialsContext} bean here to force the use of client credentials.
     * Otherwise, if an {@link OAuth2Authentication} exists in the {@link SecurityContextHolder}, the access token
     * from that will be used instead of client credentials.
     * See the default configuration below as reference:
     * {@linkplain org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2RestOperationsConfiguration.RequestScopedConfiguration#oauth2ClientContext}
     */
    @Bean
    public OAuth2FeignRequestInterceptor oAuth2FeignRequestInterceptor(ClientCredentialsResourceDetails resource) {
        return new OAuth2FeignRequestInterceptor(oauth2ClientCredentialsContext(), resource);
    }
}
