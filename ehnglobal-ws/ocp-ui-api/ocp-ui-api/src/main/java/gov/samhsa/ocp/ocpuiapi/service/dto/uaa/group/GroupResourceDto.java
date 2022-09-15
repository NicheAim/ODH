package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupResourceDto {

    private String id;
    private GroupMetaDto meta;
    private String displayName;
    private String zoneId;
    private String description;
    private List<GroupMemberDto> members = null;
    private List<String> schemas = null;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

}
