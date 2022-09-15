package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.UserContextDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Slf4j
public class UserContextController {

    @Autowired
    UserContextService userContextService;

    @GetMapping("/user-context")
    public UserContextDto getUserResource(Principal principal) {
        return userContextService.getUserContext();
    }

}
