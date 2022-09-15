package gov.samhsa.ocp.smartcore.service.dto.keycloakclient;

import lombok.Data;

@Data
public class ClientAccessDto {
    private boolean view;
    private boolean configure;
    private boolean manage;
}
