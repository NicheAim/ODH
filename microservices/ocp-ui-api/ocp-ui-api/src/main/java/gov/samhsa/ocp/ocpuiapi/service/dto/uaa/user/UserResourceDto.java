
package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user;

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
public class UserResourceDto {

    private String id;
    private UserMetaDto meta;
    private String userName;
    private UserNameDto name;
    private List<UserEmailDto> emails = null;
    private List<UserGroupDto> groups = null;
    private List<Object> approvals = null;
    private Boolean active;
    private Boolean verified;
    private String origin;
    private String zoneId;
    private String passwordLastModified;
    private Integer previousLogonTime;
    private Integer lastLogonTime;
    private List<String> schemas = null;
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

}
