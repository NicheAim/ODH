package gov.samhsa.ocp.smartcore.web;

import gov.samhsa.ocp.smartcore.service.LauncherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

import static gov.samhsa.ocp.smartcore.config.Constants.CLIENT_ID;
import static gov.samhsa.ocp.smartcore.config.Constants.LAUNCH;
import static gov.samhsa.ocp.smartcore.config.Constants.REDIRECT_PREFIX;

@Controller
public class LauncherController {

    @Autowired
    private LauncherService launcherService;

    @GetMapping("/launcher")
    public String launcher(@RequestParam(CLIENT_ID) String clientId, @RequestParam(LAUNCH) Optional<String> launch) {
        final String appLaunchRedirectUri = launcherService.getLaunchRedirectUri(clientId, launch).toString();
        return REDIRECT_PREFIX + appLaunchRedirectUri;
    }
}
