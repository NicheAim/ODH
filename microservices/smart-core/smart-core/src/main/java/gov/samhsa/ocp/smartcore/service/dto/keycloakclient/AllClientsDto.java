package gov.samhsa.ocp.smartcore.service.dto.keycloakclient;

import gov.samhsa.ocp.smartcore.service.dto.ClientType;
import lombok.Data;

@Data
public class AllClientsDto {
    private String id;
    private String clientId;
    private String[] redirectUris;
    private String[] defaultClientScopes;
    private String name;

    // Additional
    private ClientAttributesDto attributes;
    private String baseUrl;
    private Boolean publicClient;
}
