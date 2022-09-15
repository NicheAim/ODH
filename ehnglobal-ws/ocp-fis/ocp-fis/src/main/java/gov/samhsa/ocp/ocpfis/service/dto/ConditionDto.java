package gov.samhsa.ocp.ocpfis.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConditionDto {
    private ValueCodeableConceptDto code;
    private SubjectReferenceDto subject;
    private String conditionid;
    private String resourcetype;
    private String recordedDate;
    private List<ValueCodeableConceptDto> category;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String patientid;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String conditioncode;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String priority;
}
