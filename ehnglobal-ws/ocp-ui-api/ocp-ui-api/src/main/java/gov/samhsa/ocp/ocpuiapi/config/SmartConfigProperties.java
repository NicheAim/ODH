package gov.samhsa.ocp.ocpuiapi.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "ocp.ocp-ui-api.smart")
@Data
public class SmartConfigProperties {
    @Valid
    @NotNull
    public List<String> patientClientIds;
    @Valid
    @NotNull
    public List<String> clientIds;
}
