package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KeycloakRefreshDto {
    private String refresh_token;
    private String access_token;
    private String expires_in;
    private String refresh_expires_in;
    private String token_type;
    private String id_token;
    private String session_state;
    private String scope;
}
