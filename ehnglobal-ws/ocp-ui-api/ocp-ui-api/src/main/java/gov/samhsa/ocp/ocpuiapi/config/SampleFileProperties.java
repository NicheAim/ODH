package gov.samhsa.ocp.ocpuiapi.config;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Component
@ConfigurationProperties(prefix = "ocp.ocp-ui-api")
@Data
public class SampleFileProperties {

    @Valid
    @NotNull
    private SampleFileForLoginDetails sampleFileForLoginDetails;

    @Data
    public static class SampleFileForLoginDetails {
        @Valid
        @NotBlank
        public String fileName;
    }
}
