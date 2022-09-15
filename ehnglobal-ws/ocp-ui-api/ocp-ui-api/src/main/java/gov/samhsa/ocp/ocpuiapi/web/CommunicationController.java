package gov.samhsa.ocp.ocpuiapi.web;


import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.CommunicationDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("ocp-fis")
@Slf4j
public class CommunicationController {
    final
    FisClient fisClient;

    @Autowired
    public CommunicationController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Autowired
    UserContextService userContextService;

    @GetMapping("/communications/search")
    public Object getCommunications(@RequestParam(value = "statusList", required = false) List<String> statusList,
                                    @RequestParam(value = "searchKey", required = false) String searchKey,
                                    @RequestParam(value = "searchValue", required = false) String searchValue,
                                    @RequestParam(value = "organization", required = false) String organization,
                                    @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Searching Communications from FHIR server");
        try {
            Object communication = fisClient.getCommunications(statusList, searchKey, searchValue, organization, pageNumber, pageSize);
            log.info("Got Response from FHIR server for Communications Search");
            return communication;
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Communications were found in the configured FHIR server for the given searchKey and searchValue");
            return null;
        }
    }


    @PostMapping("/communications")
    @ResponseStatus(HttpStatus.CREATED)
    public void createCommunication(@Valid @RequestBody CommunicationDto communicationDto) {
        log.info("About to create a communication");
        try {
            fisClient.createCommunication(communicationDto, userContextService.getUserFhirId());
            log.info("Successfully created a communication.");
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the communication was not created");
        }
    }

    @PutMapping("/communications/{communicationsId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateCommunication(@PathVariable String communicationsId, @Valid @RequestBody CommunicationDto communicationDto) {
        try {
            fisClient.updateCommunication(communicationsId, communicationDto, userContextService.getUserFhirId());
            log.debug("Successfully updated a communication");
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Communication could not be updated in the FHIR server");
        }
    }

    @GetMapping("/communications")
    public Object getCommunications(@RequestParam(value = "patient") String patient,
                                    @RequestParam(value = "topic") String topic,
                                    @RequestParam(value = "resourceType") String resourceType,
                                    @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Searching Communications from FHIR server");
        try {
            Object communication = fisClient.getCommunicationsByTopic(patient, topic, resourceType, pageNumber, pageSize);
            log.info("Got Response from FHIR server for Communications Search based on patient and topic");
            return communication;
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Communications were found in the configured FHIR server for the given patient, topic and resourceType");
            return null;
        }
    }

}
