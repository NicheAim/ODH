package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.service.dto.JwtTokenKey;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.jwt.Jwt;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.oauth2.common.util.JsonParser;
import org.springframework.security.oauth2.common.util.JsonParserFactory;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Map;

@Service
public class JwtTokenExtractorImpl implements JwtTokenExtractor{

    public Object getValueByKey(JwtTokenKey jwtTokenKey) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Assert.notNull(authentication, "No authentication data provided");
        OAuth2AuthenticationDetails oAuth2AuthenticationDetails = (OAuth2AuthenticationDetails) authentication.getDetails();

        JsonParser objectMapper = JsonParserFactory.create();
        Jwt jwt = JwtHelper.decode(oAuth2AuthenticationDetails.getTokenValue());
        Map<String, Object> map = objectMapper.parseMap(jwt.getClaims());
        return map.get(jwtTokenKey.toString());
    }
}
