package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LaunchRequestDto {
    private String user;
    private String organization;
    private String location;
    private String patient;
    private String encounter;
    private String resource;
    @JsonProperty("needPatientBanner")
    private Boolean needPatientBanner;
    private String intent;
}
