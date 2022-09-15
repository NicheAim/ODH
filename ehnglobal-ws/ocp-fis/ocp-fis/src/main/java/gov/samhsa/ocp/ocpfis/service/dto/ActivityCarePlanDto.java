package gov.samhsa.ocp.ocpfis.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ActivityCarePlanDto {
    private ActivityReferenceDto reference; // Task Reference
    private DetailActivityDto detail;
}
