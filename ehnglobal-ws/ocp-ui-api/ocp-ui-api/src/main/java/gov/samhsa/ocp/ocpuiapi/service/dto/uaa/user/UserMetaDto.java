
package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserMetaDto {

    private Integer version;
    private String created;
    private String lastModified;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

}
