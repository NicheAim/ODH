package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.CredentialDto;
import gov.samhsa.ocp.ocpuiapi.service.OutlookCalendarService;
import gov.samhsa.ocp.ocpuiapi.service.dto.OutlookCalendarDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("ocp-fis/outlook")
public class OutlookCalendarController {
    private final OutlookCalendarService outlookCalendarService;

    public OutlookCalendarController(OutlookCalendarService outlookCalendarService) {
        this.outlookCalendarService = outlookCalendarService;
    }

    @GetMapping("/calendar")
    public List<OutlookCalendarDto> getOutlookCalendarAppointments(@RequestParam String emailAddress,
                                                                   @RequestParam String password) {
        return outlookCalendarService.getOutlookCalendarAppointments(emailAddress, password);
    }

    @PostMapping("/login")
    public void login(@Valid @RequestBody CredentialDto credentialDto) {
        outlookCalendarService.loginToOutlook(credentialDto);
    }
}
