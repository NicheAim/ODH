package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupRequestDto {

    private String id;

    private String displayName;

    private String description;

    @NotEmpty
    private List<String> scopes;

}
