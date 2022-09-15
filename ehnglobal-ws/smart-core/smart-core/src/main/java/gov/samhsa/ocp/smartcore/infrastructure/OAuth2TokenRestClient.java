package gov.samhsa.ocp.smartcore.infrastructure;

import feign.Headers;
import gov.samhsa.ocp.smartcore.domain.GrantType;
import gov.samhsa.ocp.smartcore.infrastructure.dto.TokenResponseDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static gov.samhsa.ocp.smartcore.config.Constants.*;

@FeignClient(name = "oauth2TokenRestClient", url = "${smart-core.oauth2-token}")
public interface OAuth2TokenRestClient {

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    TokenResponseDto getToken(@RequestParam(GRANT_TYPE) String grantType,
                              @RequestParam(CODE) String code,
                              @RequestParam(REDIRECT_URI) String redirectUri,
                              @RequestParam(CLIENT_ID) String client_id,
                              @RequestBody() String data);
}
