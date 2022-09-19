package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.domain.SearchKeyEnum;
import gov.samhsa.ocp.ocpfis.service.RelatedPersonService;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.RelatedPersonDto;
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
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(value = "/relatedpersons")
public class RelatedPersonController {
    public enum SearchType {
        identifier, name
    }

    @Autowired
    private RelatedPersonService relatedPersonService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createRelatedPerson(@Valid @RequestBody RelatedPersonDto relatedPersonDto, Optional<String> loggedInUser) {
        log.info("About to create Related Person");
        relatedPersonService.createRelatedPerson(relatedPersonDto, loggedInUser);
    }

    @PutMapping("/{relatedPersonId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateRelatedPerson(@PathVariable String relatedPersonId, @Valid @RequestBody RelatedPersonDto relatedPersonDto, Optional<String> loggedInUser) {
        relatedPersonService.updateRelatedPerson(relatedPersonId, relatedPersonDto, loggedInUser);
    }

    @GetMapping("/search")
    public PageDto<RelatedPersonDto> getRelatedPersons(
                                                       @RequestParam String patientId,
                                                       @RequestParam Optional<String> searchKey,
                                                       @RequestParam Optional<String> searchValue,
                                                       @RequestParam Optional<Boolean> showInActive,
                                                       @RequestParam Optional<Integer> pageNumber,
                                                       @RequestParam Optional<Integer> pageSize,
                                                       @RequestParam Optional<Boolean> showAll) {
        return relatedPersonService.searchRelatedPersons(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @GetMapping("/{relatedPersonId}")
    public RelatedPersonDto getRelatedPersonById(@PathVariable String relatedPersonId) {
        return relatedPersonService.getRelatedPersonById(relatedPersonId);
    }

}
