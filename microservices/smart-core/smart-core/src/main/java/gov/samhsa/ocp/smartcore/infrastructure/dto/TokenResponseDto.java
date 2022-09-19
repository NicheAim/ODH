package gov.samhsa.ocp.smartcore.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

import static gov.samhsa.ocp.smartcore.config.Constants.ACCESS_TOKEN;
import static gov.samhsa.ocp.smartcore.config.Constants.EXPIRES_IN;
import static gov.samhsa.ocp.smartcore.config.Constants.EXT_ATTR;
import static gov.samhsa.ocp.smartcore.config.Constants.ID_TOKEN;
import static gov.samhsa.ocp.smartcore.config.Constants.NEED_PATIENT_BANNER;
import static gov.samhsa.ocp.smartcore.config.Constants.REFRESH_TOKEN;
import static gov.samhsa.ocp.smartcore.config.Constants.SMART_STYLE_URL;
import static gov.samhsa.ocp.smartcore.config.Constants.TOKEN_TYPE;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TokenResponseDto {
    @JsonProperty(ACCESS_TOKEN)
    private String accessToken;
    @JsonProperty(TOKEN_TYPE)
    private String tokenType;
    @JsonProperty(REFRESH_TOKEN)
    private String refreshToken;
    @JsonProperty(ID_TOKEN)
    private String idToken;
    @JsonProperty(EXPIRES_IN)
    private int expiresIn;
    @JsonProperty("exp")
    private int exp;
    private String scope;
    @JsonProperty(EXT_ATTR)
    private Map<String, String> extraAttributes;
    private String jti;
    private String sub;
    @JsonProperty("session_state")
    private String session_state;
    // SMART Context
    private String launch;
    private String user;
    private String organization;
    private String location;
    private String patient;
    private String encounter;
    private String resource;
    @JsonProperty(NEED_PATIENT_BANNER)
    private Boolean needPatientBanner;
    private String intent;
    @JsonProperty(SMART_STYLE_URL)
    private String smartStyleUrl;
}
