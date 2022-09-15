package gov.samhsa.ocp.ocpuiapi.infrastructure;

import gov.samhsa.ocp.ocpuiapi.config.OAuth2FeignUserTokenConfig;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordResponseDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "uaaUserTokenRestClient", url = "${ocp.ocp-ui-api.oauth2.authorization-server-endpoint}", configuration = OAuth2FeignUserTokenConfig.class)
public interface UaaUserTokenRestClient {

    @RequestMapping(value = "/Users/{userId}/password", method = RequestMethod.PUT)
    ChangePasswordResponseDto changePassword(@PathVariable("userId") String userId, ChangePasswordRequestDto changePasswordRequestDto);
}
