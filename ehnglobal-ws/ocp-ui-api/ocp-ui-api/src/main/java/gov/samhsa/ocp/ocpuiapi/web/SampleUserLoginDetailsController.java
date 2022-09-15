package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.service.SampleUserLoginDetailsService;
import gov.samhsa.ocp.ocpuiapi.service.dto.SampleUserLoginDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleUserLoginDetailsController {
    @Autowired
    SampleUserLoginDetailsService sampleUserLoginDetailsService;

    @GetMapping("/sample-user-login-details")
    public SampleUserLoginDetailsDto getSampleUserLoginResource() {
        return sampleUserLoginDetailsService.getSampleUserLoginDetails();
    }
}
