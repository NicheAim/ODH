package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.ConditionService;
import gov.samhsa.ocp.ocpfis.service.dto.ConditionDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/conditions")
public class ConditionController {
    @Autowired
    ConditionService conditionService;

    @GetMapping
    public PageDto<ConditionDto> getConditionsforPatient(
            @RequestParam(value = "patient") String patient,
            @RequestParam(value = "pagesize", required = false) Optional<Integer> pagesize,
            @RequestParam(value = "pagenumber", required = false) Optional<Integer> pagenumber) {
        return conditionService.getConditionsforPatient(patient, pagesize, pagenumber);
    }

    @GetMapping(value = "/{conditionid}")
    public ConditionDto getConditionById(
            @PathVariable(value = "conditionid") String conditionid
    ) {
        return conditionService.getConditionById(conditionid);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ConditionDto saveconditionforpatient(@Valid @RequestBody ConditionDto conditionDto) {
        return conditionService.saveconditionforpatient(conditionDto);
    }

    @PutMapping(value = "/{conditionid}")
    @ResponseStatus(HttpStatus.CREATED)
    public ConditionDto updateCondition(@Valid @RequestBody ConditionDto conditionDto, @PathVariable(value = "conditionid") String conditionid) {
        return conditionService.updateCondition(conditionDto, conditionid);
    }

}
