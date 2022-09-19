package gov.samhsa.ocp.smartcore.infrastructure.dto;

import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.ClientAttributesDto;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
public class ClientMetaDto {
    private String id;
    private String clientId;
    private String clientName;
    private String name;
    private boolean showOnHomePage;
    private String appLaunchUrl;
    private String appIcon;
    private List<String> redirectUris;
    private String baseUrl;
    private String[] defaultClientScopes;
    private ClientAttributesDto attributes;
}
