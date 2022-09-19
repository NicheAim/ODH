package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;

import lombok.Data;

import java.util.List;

@Data
public class UaaUserInfoDto {
    private List<String> user_id;
    private List<String> resource;
    private List<String> id;
    private List<String> orgId;
}
