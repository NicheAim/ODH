package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.ScriptAssert;
import org.springframework.util.StringUtils;

@Data
@Builder
@AllArgsConstructor(staticName = "of")
@NoArgsConstructor
@ScriptAssert(alias = "_", lang = "javascript", script = "_.hasSystemOrOid()")
public class IdentifierDto {

    private String system;

    private String oid;

    private String systemDisplay;

    @NotBlank
    private String value;

    private int priority;

    private String display;

    public boolean hasSystemOrOid() {
        return StringUtils.hasText(system) || StringUtils.hasText(oid);
    }
}
