package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ActionPlanDefinitionDto {
    private String title;
    private List<String> goalId;
    private DurationDto timingDuration;
}
