package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.CarePlanService;
import gov.samhsa.ocp.ocpfis.service.dto.CarePlanDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/careplans")
public class CarePlanController {

    @Autowired
    CarePlanService carePlanService;

    @GetMapping
    public PageDto<CarePlanDto> getAllCarePlans(@RequestParam Optional<Boolean> showInactive, @RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {
        return carePlanService.getAllCarePlans(showInactive, page, size);
    }

    @GetMapping("/search")
    public PageDto<CarePlanDto> getCarePlanbyPatient(
            @RequestParam String patientId,
            @RequestParam Optional<String> searchKey,
            @RequestParam Optional<String> searchValue,
            @RequestParam Optional<Boolean> showInActive,
            @RequestParam Optional<Integer> pageNumber,
            @RequestParam Optional<Integer> pageSize,
            @RequestParam Optional<Boolean> showAll){
        return carePlanService.getCarePlanbyPatient(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createCarePlan(@Valid @RequestBody CarePlanDto carePlanDto) {
        carePlanService.createCarePlan(carePlanDto);
    }
}
