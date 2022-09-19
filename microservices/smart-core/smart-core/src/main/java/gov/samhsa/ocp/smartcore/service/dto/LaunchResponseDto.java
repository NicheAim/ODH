package gov.samhsa.ocp.smartcore.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import static gov.samhsa.ocp.smartcore.config.Constants.NEED_PATIENT_BANNER;
import static gov.samhsa.ocp.smartcore.config.Constants.SMART_STYLE_URL;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LaunchResponseDto {
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
