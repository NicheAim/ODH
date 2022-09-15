package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.CoverageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("ocp-fis")
@Slf4j
public class CoverageController {

    @Autowired
    private FisClient fisClient;

    @Autowired
    UserContextService userContextService;

    @PostMapping("/coverage")
    public void createCoverage(@Valid @RequestBody CoverageDto coverageDto) {
        log.info("About to create a coverage");
        try {
            fisClient.createCoverage(coverageDto, userContextService.getUserFhirId());
            log.info("Successfully created a coverage");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the coverage was not created");
        }
    }

    @PutMapping("/coverage/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateCoverage(@PathVariable String id, @Valid @RequestBody CoverageDto coverageDto, @RequestParam(value = "loggedInUser", required = false) String loggedInUser) {
        log.info("About to update the coverage with ID: " + id);
        try {
            fisClient.updateCoverage(id, coverageDto, loggedInUser);
            log.debug("Successfully updated the coverage.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the coverage could not be updated.");
        }
    }

    @GetMapping("/coverage/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Object getCoverageById(@PathVariable String id) {
        try {
            log.debug("Successfully retrieved a patient with the given id : " + id);
            return fisClient.getCoverageById(id);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Coverage could not be retrieved for given id : " + id);
            return fe;
        }
    }

    @GetMapping("/patients/{patientId}/subscriber-options")
    public List<ReferenceDto> getSubscriberOptions(@PathVariable String patientId){
        return fisClient.getSubscriberOptions(patientId);
    }

    @GetMapping("/patients/{patientId}/coverages")
    public Object getCoverages(@PathVariable String patientId, @RequestParam(value="pageNumber",required = false) Integer pageNumber,
                               @RequestParam(value="pageSize",required = false) Integer pageSize){
        log.info("Get coverages of the patient");
        try{
            return fisClient.getCoverages(patientId,pageNumber,pageSize);
        }catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe,"coverages couldn't be fetch.");
            return null;
        }
    }
}
