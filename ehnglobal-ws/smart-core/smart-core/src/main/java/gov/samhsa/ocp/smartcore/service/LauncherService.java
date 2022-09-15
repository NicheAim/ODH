package gov.samhsa.ocp.smartcore.service;

import java.net.URI;
import java.util.Optional;

public interface LauncherService {
    URI getLaunchRedirectUri(String clientId, Optional<String> launch);
}
