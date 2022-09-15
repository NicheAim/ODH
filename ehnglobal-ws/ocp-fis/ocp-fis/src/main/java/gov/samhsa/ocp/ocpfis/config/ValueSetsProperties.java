package gov.samhsa.ocp.ocpfis.config;

import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "ocp-fis.value-sets")
@Data
@Validated
public class ValueSetsProperties {

    @Valid
    public List<ValueSetDto> participantRole;

    @Valid
    public List<ValueSetDto> taskStatus;

    @Valid
    public List<ValueSetDto> careTeamReason;

    @Valid
    public List<ValueSetDto> careTeamCategory;


}
