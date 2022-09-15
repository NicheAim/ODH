package gov.samhsa.ocp.ocpuiapi.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ObservationDto {
    private String id;
    private CodeDto code;
    private String status;
    private TextDto text;
    private ValueCodeableConceptDto valueCodeableConcept;
    private SubjectReferencedto subject;
    private Integer valueInteger;
    Optional<String> issued;
}
