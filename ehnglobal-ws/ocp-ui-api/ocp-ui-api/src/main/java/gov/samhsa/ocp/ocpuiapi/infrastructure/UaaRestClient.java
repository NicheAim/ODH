package gov.samhsa.ocp.ocpuiapi.infrastructure;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.AutologinResponseDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.CredentialDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "uaaRest", url = "${ocp.ocp-ui-api.oauth2.authorization-server-endpoint}")
public interface UaaRestClient {

    @RequestMapping(value = "/autologin", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    AutologinResponseDto getAutologin(@RequestBody CredentialDto credentials, @RequestHeader("Authorization") String basicAuth);
}
