package gov.samhsa.ocp.smartcore.service.dto;

import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.ClientAttributesDto;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ClientDetailDto {
    // Optional value (it could be useful)
    private String id;
    private ClientType clientType;
    private String clientId;
    private String[] redirectUris;
    private String[] defaultClientScopes;
    private String name;

    private String clientSecret;
    private String appLaunchUrl;
    private String appIcon;
}
