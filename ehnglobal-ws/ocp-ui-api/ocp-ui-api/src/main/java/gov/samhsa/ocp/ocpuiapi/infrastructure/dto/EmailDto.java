package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;

import lombok.Data;

@Data
public class EmailDto {
    private String value;
    private boolean primary;
}
