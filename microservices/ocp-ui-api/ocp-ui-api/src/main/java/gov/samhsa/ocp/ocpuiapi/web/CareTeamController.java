package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.CareTeamDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ParticipantDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
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
import java.util.List;

@RestController
@RequestMapping("ocp-fis/care-teams")
@Slf4j
public class CareTeamController {

    private final FisClient fisClient;
    private final UserContextService userContextService;

    @Autowired
    public CareTeamController(FisClient fisClient, UserContextService userContextService) {
        this.fisClient = fisClient;
        this.userContextService = userContextService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createCareTeam(@Valid @RequestBody CareTeamDto careTeamDto) {
        try {
            fisClient.createCareTeam(careTeamDto, userContextService.getUserFhirId());
            log.debug("Successfully created a CareTeam");

        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Care Team could not be created in the FHIR server");
        }
    }

    @PutMapping("/{careTeamId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateCareTeam(@PathVariable(value = "careTeamId") String careTeamId, @Valid @RequestBody CareTeamDto careTeamDto) {
        log.info("Updating CareTeam with Id: "+careTeamId);
        try {
            fisClient.updateCareTeam(careTeamId, careTeamDto, userContextService.getUserFhirId());
            log.debug("Successfully updated a CareTeam");

        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Care Team could not be updated in FHIR server");
        }
    }

    @PutMapping("/{careTeamId}/add-related-person")
    @ResponseStatus(HttpStatus.OK)
    public void addRealtedPerson(@PathVariable String careTeamId, @Valid @RequestBody ParticipantDto participantDto) {
        try {
            fisClient.addRelatedPerson(careTeamId, participantDto);
            log.debug("Successfully add related person");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Care Team could not be added in FHIR server");
        }
    }

    @PutMapping("/{careTeamId}/remove-related-person")
    @ResponseStatus(HttpStatus.OK)
    public void removeRelatedPerson(@PathVariable String careTeamId, @Valid @RequestBody ParticipantDto participantDto) {
        try {
            fisClient.removeRelatedPerson(careTeamId, participantDto);
            log.debug("Successfully remove related person");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Care Team could not be remove in FHIR server");
        }
    }

    @GetMapping("/search")
    public PageDto<CareTeamDto> searchCareTeams(@RequestParam(value = "statusList", required = false) List<String> statusList,
                                                @RequestParam(value = "searchType", required = false) String searchType,
                                                @RequestParam(value = "searchValue", required = false) String searchValue,
                                                @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Searching Care Teams from FHIR server");
        try {
            PageDto<CareTeamDto> careTeams = fisClient.searchCareTeams(statusList, searchType, searchValue, pageNumber, pageSize);
            log.info("Got Response from FHIR server for Care Team Search");
            return careTeams;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Care Teams were found in the configured FHIR server for the given searchType and searchValue");
            return null;
        }

    }

    @GetMapping("/{careTeamId}")
    public CareTeamDto getCareTeamByDto(@PathVariable String careTeamId) {
        try {
            return fisClient.getCareTeamById(careTeamId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Care Team could not be found in the FHIR server");
            return null;
        }
    }

    @GetMapping
    public PageDto<CareTeamDto> getCareTeamsByPatient(@RequestParam(value = "patient") String patient,
                                                      @RequestParam(value = "organization", required = false) String organization,
                                                      @RequestParam(value = "status", required = false) List<String> status,
                                                      @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                      @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        try {
            return fisClient.getCareTeamsByPatient(patient, organization, status, pageNumber, pageSize);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Care Team could not be found in the FHIR server for the given search criteria");
            return null;
        }
    }

    @GetMapping("/{careTeamId}/related-persons/search")
    public PageDto<ParticipantDto> getRelatedPersonForEdit(@PathVariable String careTeamId,
                                                           @RequestParam(value = "name", required = false) String name,
                                                           @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                           @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        try {
            return fisClient.getRelatedPersonsForEdit(careTeamId, name, pageNumber, pageSize);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "Related persons werent available");
            return null;
        }
    }

    @GetMapping("/participant-references")
    public List<ReferenceDto> getParticipantMemberFromCareTeam(@RequestParam(value="patient") String patient) {
        try {
            return fisClient.getParticipantMemberFromCareTeam(patient);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "Participant references weren't available");
            return null;
        }
    }
}
