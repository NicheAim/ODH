package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsageContextDto {
    private CodingDto code;
    //private SubjectReferenceDto valueReference;
    private ValueCodeableConceptDto valueCodeableConcept;
}
