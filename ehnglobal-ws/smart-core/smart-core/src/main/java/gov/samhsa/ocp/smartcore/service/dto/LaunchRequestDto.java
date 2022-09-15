package gov.samhsa.ocp.smartcore.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static gov.samhsa.ocp.smartcore.config.Constants.NEED_PATIENT_BANNER;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LaunchRequestDto {
    private String user;
    private String organization;
    private String location;
    private String patient;
    private String encounter;
    private String resource;
    @JsonProperty(NEED_PATIENT_BANNER)
    private Boolean needPatientBanner;
    private String intent;
}
