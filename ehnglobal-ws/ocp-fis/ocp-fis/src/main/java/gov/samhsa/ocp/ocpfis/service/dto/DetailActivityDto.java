package gov.samhsa.ocp.ocpfis.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class DetailActivityDto {
    private List<SubjectReferenceDto> goal;
}
