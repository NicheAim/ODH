package gov.samhsa.ocp.ocpuiapi.service.dto.uaa;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleToUserDto {

    String groupId;

    String userId;
}
