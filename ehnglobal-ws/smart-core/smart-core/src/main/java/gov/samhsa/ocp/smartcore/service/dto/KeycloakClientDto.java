package gov.samhsa.ocp.smartcore.service.dto;

import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.ClientAccessDto;
import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.ClientAttributesDto;
import lombok.Data;

@Data
public class KeycloakClientDto {
    private String clientId; // clientId
    private String name; // name
    private ClientAccessDto access;
    private boolean enabled; // must be true
    private String protocol;
    private String description;
    private String baseUrl;
    private boolean directAccessGrantsEnabled; // must be true
    private boolean standardFlowEnabled; // must be true
    private String[] defaultRoles;
    private String[] redirectUris; // redirectUris
    private String[] defaultClientScopes; // defaultClientScopes
    private boolean publicClient;
    private ClientAttributesDto attributes;
}
