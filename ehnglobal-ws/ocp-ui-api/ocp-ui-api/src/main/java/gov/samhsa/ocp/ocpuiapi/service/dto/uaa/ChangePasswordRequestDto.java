package gov.samhsa.ocp.ocpuiapi.service.dto.uaa;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

@Data
public class ChangePasswordRequestDto {
    @NotBlank
    String oldPassword;
    @NotBlank
    String password;
}
