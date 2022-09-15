package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.userinfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {

    private String userId;
    private String info;

}