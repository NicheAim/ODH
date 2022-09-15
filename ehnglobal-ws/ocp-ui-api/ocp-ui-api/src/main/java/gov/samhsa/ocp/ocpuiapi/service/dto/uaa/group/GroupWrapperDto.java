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
public class GroupWrapperDto {

    private List<GroupResourceDto> resources = null;
    private Integer startIndex;
    private Integer itemsPerPage;
    private Integer totalResults;
    private List<String> schemas = null;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

}
