package gov.samhsa.ocp.ocpuiapi.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "keycloak-search-client")
@Data
public class KeycloakSearchClientProperties{
    private String realm;
}
