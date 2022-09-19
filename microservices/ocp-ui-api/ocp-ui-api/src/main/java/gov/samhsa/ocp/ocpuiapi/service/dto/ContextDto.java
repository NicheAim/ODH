package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContextDto {
    private String logicalId;

    private String status;

    private ValueSetDto type;

    private ReferenceDto patient;

    private ReferenceDto managingOrganization;

    private PeriodDto period;

    private ReferenceDto referralRequest;

    private ReferenceDto careManager;
}
