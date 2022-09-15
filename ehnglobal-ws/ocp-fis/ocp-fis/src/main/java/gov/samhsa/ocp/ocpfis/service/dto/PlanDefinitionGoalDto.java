package gov.samhsa.ocp.ocpfis.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlanDefinitionGoalDto {
    private ValueCodeableConceptDto category;
    private ValueCodeableConceptDto description;
    private ValueCodeableConceptDto start;
    private List<PlanDefinitionGoalTargetDto> target;
}
