package gov.samhsa.ocp.ocpuiapi.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "keycloak")
@Data
public class KeycloakProperties{
    private String url;
    private String realm;
    private String username;
    private String password;
    private String clientid;
}
