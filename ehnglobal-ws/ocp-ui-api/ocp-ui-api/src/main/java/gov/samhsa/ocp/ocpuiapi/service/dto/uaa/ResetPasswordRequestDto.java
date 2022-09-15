package gov.samhsa.ocp.ocpuiapi.service.dto.uaa;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

@Data
public class ResetPasswordRequestDto {
    @NotBlank
    String password;
}
