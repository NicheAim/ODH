package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.ObservationDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.TaskDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("ocp-fis")

public class ObservationController {


    private final FisClient fisClient;

    @Autowired
    public ObservationController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Autowired
    UserContextService userContextService;

    @GetMapping("/observations/{observationId}")
    public ObservationDto getObservation(@PathVariable String observationId) {
        return fisClient.getObservation(observationId);
    }

    @PutMapping("/observations/{observationId}")
    void updateObservation(@PathVariable String observationId, @Valid @RequestBody ObservationDto observationDto){
        fisClient.updateObservation(observationId, observationDto);
    }

    // Todo: Resolve endpoint conflicts with getOrganizationsByPractitioner
    @GetMapping("/observations")
    public PageDto<ObservationDto> getObservations(@RequestParam(value = "practitioner", required = false) String practitioner) {
        return fisClient.getObservations(false, 1, 100);
    }

    @GetMapping("/observationpatient/patient-reference")
    public PageDto<ObservationDto> getObservationsByPatient(@RequestParam(value = "patient") String patient,
                                                            @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                            @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return fisClient.getObservationsByPatient(patient, false, pageNumber, pageSize);
    }

    @PostMapping("/observations")
    @ResponseStatus(HttpStatus.CREATED)
    public void createObservation(@Valid @RequestBody ObservationDto observationDto) {
        log.info("About to create an observation");
        try {
            fisClient.createObservation(observationDto);
            log.info("Successfully created an observation.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the observation was not created");
        }
    }

}
