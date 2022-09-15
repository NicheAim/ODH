package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.dto.ConditionDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("ocp-fis/conditions")
public class ConditionController {

    private final FisClient fisClient;

    @Autowired
    public ConditionController(FisClient fisClient){this.fisClient = fisClient;}

    @GetMapping
    public PageDto<ConditionDto> getConditionsforPatient(
            @RequestParam(value = "patient") String patient,
            @RequestParam(value = "pagesize", required = false) Integer pagesize,
            @RequestParam(value = "pagenumber", required = false) Integer pagenumber
    ) {
        return fisClient.getConditionsforPatient(patient, pagesize, pagenumber);
    }

    @GetMapping(value = "/{conditionid}")
    public ConditionDto getConditionById(
            @PathVariable(value = "conditionid") String conditionid
    ) {
        return fisClient.getConditionById(conditionid);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ConditionDto saveconditionforpatient(
            @Valid @RequestBody ConditionDto conditionDto
    ){
        return fisClient.saveconditionforpatient(conditionDto);
    }

    @PutMapping(value = "/{conditionid}")
    @ResponseStatus(HttpStatus.CREATED)
    public ConditionDto updateCondition(@Valid @RequestBody ConditionDto conditionDto, @PathVariable(value = "conditionid") String conditionid) {
        return fisClient.updateCondition(conditionDto, conditionid);
    }

}
