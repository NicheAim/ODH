package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.CarePlanDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.DocumentReferenceDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("ocp-fis/careplans")
public class CarePlanController {
    private FisClient fisClient;

    @Autowired
    public CarePlanController(FisClient fisClient){this.fisClient = fisClient;}

    @Autowired
    UserContextService userContextService;

    @GetMapping
    public PageDto<CarePlanDto> getAllCarePlans() {
        return fisClient.getAllCarePlans(false, 1, 100);
    }

    @GetMapping("/search")
    public PageDto<CarePlanDto> getCarePlanbyPatient(
            @RequestParam(value = "patientId") String patientId,
            @RequestParam(value = "searchKey", required = false) String searchKey,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "showInActive", required = false) Boolean showInActive,
            @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value="showAll",required=false) Boolean showAll){
        return fisClient.getCarePlanbyPatient(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createCarePlan(@Valid @RequestBody CarePlanDto carePlanDto) {
        log.info("About to create a CarePlan");
        try {
            fisClient.createCarePlan(carePlanDto);
            log.info("Successfully created the CarePlan");
        }catch (FeignException e){
            ExceptionUtil.handleFeignException(e, "that the CarePlan was not created");
        }
    }
}