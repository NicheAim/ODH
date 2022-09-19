package gov.samhsa.ocp.ocpuiapi.infrastructure;

import gov.samhsa.ocp.ocpuiapi.config.KeycloakProperties;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KeycloakRestClient{
    private Keycloak kc;

    private KeycloakProperties keycloakProperties;
    @Autowired
    KeycloakRestClient(KeycloakProperties keycloakProperties){
        this.keycloakProperties = keycloakProperties;
        log.info("keycloak property url");
        log.info("{}", keycloakProperties.getUrl());
        kc = KeycloakBuilder.builder()
                .serverUrl(keycloakProperties.getUrl())
                .realm(keycloakProperties.getRealm())
                .username(keycloakProperties.getUsername())
                .password(keycloakProperties.getPassword())
                .clientId(keycloakProperties.getClientid())
                .resteasyClient(
                        new ResteasyClientBuilder()
                                .connectionPoolSize(10).build()
                ).build();
    }
    public Keycloak getClient(){
        return kc;
    }
}
