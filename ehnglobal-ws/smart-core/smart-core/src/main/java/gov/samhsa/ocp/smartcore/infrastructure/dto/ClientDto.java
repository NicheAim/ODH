package gov.samhsa.ocp.smartcore.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import gov.samhsa.ocp.smartcore.service.dto.ClientType;
import lombok.Data;

import static gov.samhsa.ocp.smartcore.config.Constants.AUTHORIZATION_CODE;

@Data
public class ClientDto {
    private String clientId;

    private String[] authorizedGrantTypes ={AUTHORIZATION_CODE};

    private String[] redirectUri;

    private String[] scope;

    private String name;

    private String clientSecret;

    private ClientType clientType;
}
