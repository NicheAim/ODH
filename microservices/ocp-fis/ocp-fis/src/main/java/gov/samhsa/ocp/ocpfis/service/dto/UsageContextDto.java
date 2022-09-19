package gov.samhsa.ocp.ocpfis.service.dto;

import gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsageContextDto {
    private Coding code;
    //private SubjectReferenceDto valueReference;
    private ValueCodeableConceptDto valueCodeableConcept;
}
