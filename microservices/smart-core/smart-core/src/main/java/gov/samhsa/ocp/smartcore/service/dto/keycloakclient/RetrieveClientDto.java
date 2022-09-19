package gov.samhsa.ocp.smartcore.service.dto.keycloakclient;

import lombok.Data;

@Data
public class RetrieveClientDto {
    private String id;
    private String clientId;
    private String name;
    private ClientAccessDto access;
    private boolean enabled;
    private String protocol;
    private String description;
    private String baseUrl;
    private boolean directAccessGrantsEnabled;
    private boolean standardFlowEnabled;
    private String[] defaultRoles;
    private String[] redirectUris;
    private String[] defaultClientScopes;
    private boolean publicClient;
}
