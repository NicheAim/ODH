package gov.samhsa.ocp.smartcore.infrastructure.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SmartConfigurationDto {
    public String issuer;
    public String jwks_uri;
    public String authorization_endpoint;
    public List<String> grant_types_supported;
    public String token_endpoint;
    public List<String> token_endpoint_auth_methods_supported;
    public String registration_endpoint;
    public List<String> scopes_supported;
    public List<String> response_types_supported;
    public String management_endpoint;
    public String introspection_endpoint;
    public String revocation_endpoint;
    public List<String> capabilities;
    public List<String> code_challenge_methods_supported;
}
