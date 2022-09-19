package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.dto.ServiceRequestDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("ocp-fis")
@Slf4j
public class ServiceRequestController {

    final FisClient fisClient;

    @Autowired
    public ServiceRequestController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @GetMapping("/service-request")
    public List<ServiceRequestDto> getServiceRequest(@RequestParam(value = "patient", required = false) String patient) {
        log.info("Searching ServiceRequest");
        try {
            List<ServiceRequestDto> serviceRequest = fisClient.getServiceRequest(patient);
            log.info("Got Response from FHIR server for ServiceRequest search");
            return serviceRequest;
        } catch (FeignException e) {
            ExceptionUtil.handleFeignException(e, "that the no ServiceRequest were found in configured FHIR server for the given /service-request");
            return null;
        }
    }
}