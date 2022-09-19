package gov.samhsa.ocp.ocpfis.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlanDefinitionDto extends NameLogicalIdIdentifiersDto {
    private String status;
    private ValueCodeableConceptDto subjectCodeableConcept;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String title;
    private String version;
    private String description;
    private List<UsageContextDto> useContext;
    private ValueCodeableConceptDto type;
    private List<ValueCodeableConceptDto> topic;
    private List<PlanDefinitionGoalDto> goal;
    private List<ActionPlanDefinitionDto> action;
}