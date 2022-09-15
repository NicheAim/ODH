package gov.samhsa.ocp.smartcore.service;

import org.springframework.util.StringUtils;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

import static java.util.stream.Collectors.joining;

public class URIUtils {
    public static final String EQUAL = "=";
    public static final String AMPERSAND = "&";

    public static URI addParams(URI base, Map<String, String> params) throws URISyntaxException {
        final String paramsQueryString = params.entrySet().stream()
                .filter(entry -> StringUtils.hasText(entry.getKey()) && StringUtils.hasText(entry.getValue()))
                .map(entry -> entry.getKey() + EQUAL + entry.getValue())
                .collect(joining(AMPERSAND));
        return new URI(base.getScheme(), base.getAuthority(), base.getPath(), base.getQuery() == null ? paramsQueryString : base.getQuery() + AMPERSAND + paramsQueryString, base.getFragment());
    }
}
