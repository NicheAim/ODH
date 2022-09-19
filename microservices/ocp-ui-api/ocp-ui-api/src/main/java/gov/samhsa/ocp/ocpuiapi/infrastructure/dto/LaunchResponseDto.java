package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

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
    @JsonProperty("need_patient_banner")
    private Boolean needPatientBanner;
    private String intent;
    @JsonProperty("smart_style_url")
    private String smartStyleUrl;
}
