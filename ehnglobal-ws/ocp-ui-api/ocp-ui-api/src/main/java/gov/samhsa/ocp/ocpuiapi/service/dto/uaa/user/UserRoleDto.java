package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRoleDto {
    private String orgId;
    private String role;
}
