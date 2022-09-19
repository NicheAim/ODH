package gov.samhsa.ocp.ocpfis.service.dto;

import gov.samhsa.ocp.ocpfis.service.dto.valueset.Quantity;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Subject;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Text;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hl7.fhir.r4.model.CodeableConcept;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ObservationDto {
    private String id;
    private CodeDto code;
    private Text text;
    private String status;
    private ValueCodeableConceptDto valueCodeableConcept;
    private Subject subject;
    private Optional<Quantity> quantity;
    private Integer valueInteger;
    Optional<String> issued;
}
