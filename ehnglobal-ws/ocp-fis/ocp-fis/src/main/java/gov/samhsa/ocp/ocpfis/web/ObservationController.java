package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.ObservationService;
import gov.samhsa.ocp.ocpfis.service.dto.ObservationDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.TaskDto;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.exceptions.FHIRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@Slf4j
public class ObservationController {

    @Autowired
    ObservationService observationService;

    @GetMapping("/observations/{observationId}")
    public ObservationDto getObservation(@PathVariable String observationId) {
        return observationService.getObservationId(observationId);
    }

    @PutMapping("/observations/{observationId}")
    void updateObservation(@PathVariable String observationId, @Valid @RequestBody ObservationDto observationDto) {
        observationService.updateObservation(observationDto, observationId);
    }

    @GetMapping("/observations/all")
    public PageDto<ObservationDto> getObservations(@RequestParam Optional<Boolean> showInactive, @RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {

        return observationService.getAllObservations(showInactive, page, size);
    }

    @GetMapping("/observationpatient/patient-reference")
    public PageDto<ObservationDto> getObservationsByPatient(@RequestParam String patient, @RequestParam Optional<Boolean> showInactive, @RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {

        return observationService.getRelatedObservations(patient, showInactive, page, size);
    }

    @PostMapping("/observations")
    @ResponseStatus(HttpStatus.CREATED)
    public void createObservation(@Valid @RequestBody ObservationDto observationDto) {
        try {
            observationService.createObservation(observationDto);
        } catch (FHIRException e) {
            log.error("A FHIRException occured when creating an observation" + e);
        }
    }
}
