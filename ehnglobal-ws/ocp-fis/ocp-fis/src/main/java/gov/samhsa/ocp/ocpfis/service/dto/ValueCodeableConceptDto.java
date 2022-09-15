package gov.samhsa.ocp.ocpfis.service.dto;

import gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ValueCodeableConceptDto {
    private List<Coding> coding;
    private String text;
}
