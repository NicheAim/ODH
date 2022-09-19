package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.ServiceRequestService;
import gov.samhsa.ocp.ocpfis.service.dto.ServiceRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class ServiceRequestController {
    @Autowired
    ServiceRequestService serviceRequestService;

    @GetMapping("/service-request")
    public List<ServiceRequestDto> getServiceRequest(@RequestParam Optional<String> patient){
        log.info("Get Service Request");
        return serviceRequestService.getServiceRequest(patient);
    }
}
