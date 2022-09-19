package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;

import lombok.Data;

import java.util.List;

@Data
public class UaaUserDto {
    private String userName;
    private String password;
    private UaaNameDto name;
    private List<EmailDto> emails;
    private boolean active;
    private boolean verified;
    private String origin;
}
