
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
public class UserEmailDto {

    private String value;
    private Boolean primary;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

}
