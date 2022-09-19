package gov.samhsa.ocp.ocpuiapi.infrastructure;


import gov.samhsa.ocp.ocpuiapi.config.CoreFeignConfiguration;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(name = "uaaForm", url = "${ocp.ocp-ui-api.oauth2.authorization-server-endpoint}", configuration = CoreFeignConfiguration.class)
public interface UaaFormEncodedClient {

    @RequestMapping(value = "/oauth/token", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    Object getTokenUsingPasswordGrant(Map<String, ?> formParams);
}
