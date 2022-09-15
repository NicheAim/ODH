package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.CoverageService;
import gov.samhsa.ocp.ocpfis.service.dto.CoverageDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class CoverageController {

    @Autowired
    private CoverageService coverageService;

    @PostMapping("/coverage")
    public void createCoverage(@Valid @RequestBody CoverageDto coverageDto, @RequestParam(value = "loggedInUser") Optional<String> loggedInUser){
        coverageService.createCoverage(coverageDto, loggedInUser);
    }

    @PutMapping("/coverage/{id}")
    public void updateCoverage(@PathVariable String id, @Valid @RequestBody CoverageDto coverageDto, @RequestParam(value = "loggedInUser") Optional<String> loggedInUser){
        coverageService.updateCoverage(id, coverageDto, loggedInUser);
    }

    @GetMapping("/coverage/{id}")
    public CoverageDto getCoverageById(@PathVariable String id) {
        return coverageService.getCoverageById(id);
    }

    @GetMapping("/patients/{patientId}/subscriber-options")
    public List<ReferenceDto> getSubscriberOptions(@PathVariable String patientId){
       return coverageService.getSubscriberOptions(patientId);
    }

    @GetMapping("patients/{patientId}/coverages")
    public PageDto<CoverageDto> getCoverages(@PathVariable String patientId, @RequestParam Optional<Integer> pageNumber,
                                             @RequestParam Optional<Integer> pageSize){
        return coverageService.getCoverages(patientId, pageNumber, pageSize);
    }

}
