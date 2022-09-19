package gov.samhsa.ocp.smartcore.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.Valid;

@Component
@ConfigurationProperties(prefix = "smart-core")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SmartCoreProperties {
    @Valid
    @NotBlank
    private String serverHost;

    @Valid
    @NotBlank
    private String contextInitializer;

    @Valid
    @NotBlank
    private String oauth2;

    @Valid
    @NotBlank
    private String oauth2Authorize;

    @Valid
    @NotBlank
    private String oauth2Token;

    @Valid
    @NotBlank
    private String publicClientSecret;

    @Valid
    @NotBlank 
    private String data_store_tech;

    @Valid
    @NotBlank
    private String client_socket_timeout_in_ms;

    @Valid
    @NotBlank
    private String expiration_token;

    @Valid
    @NotBlank
    private String fhir;

    @Valid
    @NotBlank
    private String jwt_iss;

    @Valid
    @NotBlank
    private String jwt_sub;

    @Valid
    @NotBlank
    private String jwt_aud;

    @Valid
    @NotBlank
    private String jwt_secret;

    @Valid
    @NotBlank
    private String gcloudbucketname;

    @Valid
    @NotBlank
    private String gcloudbucketlocation;

    @Valid
    @NotBlank
    private String gcloudprojectid;
}
