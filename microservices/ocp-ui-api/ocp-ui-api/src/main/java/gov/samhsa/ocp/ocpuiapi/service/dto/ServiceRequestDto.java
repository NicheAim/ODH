package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestDto {
    private String id;
    private String intent;
    private String priority;
    private ReferenceDto requester; // Organization
    private String status;
    private ReferenceDto subject; // Patient
}
