package gov.samhsa.ocp.smartcore.infrastructure;

import gov.samhsa.ocp.smartcore.config.OAuth2FeignClientCredentialsConfig;
import gov.samhsa.ocp.smartcore.service.dto.UserDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "oauth2UserRestClient", url = "${smart-core.oauth2}", configuration = OAuth2FeignClientCredentialsConfig.class)
public interface OAuth2UserRestClient {
    @RequestMapping(value = "/users/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    UserDto getUser(@PathVariable("userId") String userId);
}
