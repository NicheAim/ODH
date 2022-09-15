package gov.samhsa.ocp.ocpuiapi.service.dto;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.AutologinResponseDto;
import lombok.Value;

@Value
public class LoginResponseDto {
    private Object authData;
    private AutologinResponseDto autologin;
}
