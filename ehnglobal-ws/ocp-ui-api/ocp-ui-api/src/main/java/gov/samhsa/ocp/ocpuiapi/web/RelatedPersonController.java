package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.RelatedPersonDto;
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

@RestController
@RequestMapping(value = "/ocp-fis/relatedpersons")
@Slf4j
public class RelatedPersonController {

    @Autowired
    FisClient fisClient;


    @Autowired
    UserContextService userContextService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createRelatedPerson(@Valid @RequestBody RelatedPersonDto relatedPersonDto) {
        log.info("User fhir id");
        log.info(userContextService.getUserFhirId());
        fisClient.createRelatedPerson(relatedPersonDto, userContextService.getUserFhirId());
    }

    @PutMapping("/{relatedPersonId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateRelatedPerson(@PathVariable String relatedPersonId, @Valid @RequestBody RelatedPersonDto relatedPersonDto) {
        fisClient.updateRelatedPerson(relatedPersonId, relatedPersonDto, userContextService.getUserFhirId());
    }

    @GetMapping("/search")
    public PageDto<RelatedPersonDto> getRelatedPersons(
                                                       @RequestParam(value = "patientId") String patientId,
                                                       @RequestParam(value = "searchKey", required = false) String searchKey,
                                                       @RequestParam(value = "searchValue", required = false) String searchValue,
                                                       @RequestParam(value = "showInActive", required = false) Boolean showInActive,
                                                       @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                       @RequestParam(value = "pageSize", required = false) Integer pageSize,
                                                       @RequestParam(value="showAll",required=false) Boolean showAll) {
        return fisClient.searchRelatedPersons(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @GetMapping("/{relatedPersonId}")
    public RelatedPersonDto getRelatedPersonById(@PathVariable String relatedPersonId) {
        return fisClient.getRelatedPersonById(relatedPersonId);
    }
}
