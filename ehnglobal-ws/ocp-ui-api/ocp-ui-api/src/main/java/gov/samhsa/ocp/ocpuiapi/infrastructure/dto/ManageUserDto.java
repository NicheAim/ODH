package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import gov.samhsa.ocp.ocpuiapi.service.dto.ValueSetDto;
import lombok.Data;

import java.util.List;

@Data
public class ManageUserDto {

    @JsonProperty("id")
    String id;

    @JsonProperty("username")
    String username;

    @JsonProperty("groupId")
    String groupId;

    @JsonProperty("givenName")
    String givenName;

    @JsonProperty("familyName")
    String familyName;

    @JsonProperty("displayName")
    String displayName;

    @JsonProperty("description")
    String description;

    @JsonProperty("info")
    String info;

    @JsonProperty("role")
    List<ValueSetDto> role;

    @JsonIgnore
    public ManageUserDto(String id, String givenName, String familyName, String displayName, String description, String info, List<ValueSetDto> role, String username, String groupId) {
        this.id = id;
        this.givenName = givenName;
        this.familyName = familyName;
        this.displayName = displayName;
        this.description = description;
        this.info = info;
        this.role = role;
        this.username = username;
        this.groupId = groupId;
    }

    //dummy constructor needed for "json parse error"
    public ManageUserDto() {

    }

}
