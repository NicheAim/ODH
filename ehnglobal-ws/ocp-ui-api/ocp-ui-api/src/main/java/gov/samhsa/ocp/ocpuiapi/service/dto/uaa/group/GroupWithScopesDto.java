package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupWithScopesDto {

    String id;

    String displayName;

    String description;

    List<String> scopes;
}
