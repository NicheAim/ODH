package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.OAuth2RestClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PatientDto;
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
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(value = {"ocp-fis/patients","ocp-fis/Patient"})
@Slf4j
public class PatientController {

    private final FisClient fisClient;

    private final OAuth2RestClient uaaClient;

    @Autowired
    UserContextService userContextService;

    public PatientController(FisClient fisClient, UserContextService userContextService, OAuth2RestClient uaaClient) {
        this.uaaClient = uaaClient;
        this.fisClient = fisClient;
    }

    @GetMapping
    public Object getPatients(@RequestParam(value = "practitioner", required = false) String practitioner,
                              @RequestParam(value = "searchKey", required = false) String searchKey,
                              @RequestParam(value = "searchValue", required = false) String searchValue,
                              @RequestParam(value = "showInActive", required = false) Boolean showInactive,
                              @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                              @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.debug("Call to Feign Client: START");
        try {
            Object patientDtos = fisClient.getPatients(practitioner, searchKey, searchValue, showInactive, pageNumber, pageSize);
            log.debug("Call to Feign Client: END");
            return patientDtos;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Patient  found in the configured FHIR server for the given searchType and searchValue");
            return fe;
        }
    }

    @GetMapping("/search")
    public PageDto<PatientDto> searchPatientsByValue(@RequestParam(value = "type", defaultValue = "name", required = false) String key,
                                                     @RequestParam(value = "value", required = false) String value,
                                                     @RequestParam(value = "filterBy", required = false) String filterBy,
                                                     @RequestParam(value = "organization", required = false) String organization,
                                                     @RequestParam(value = "practitioner", required = false) String practitioner,
                                                     @RequestParam(value = "showInactive", defaultValue = "false") boolean showInactive,
                                                     @RequestParam(value = "page", required = false) Integer page,
                                                     @RequestParam(value = "size", required = false) Integer size,
                                                     @RequestParam(value = "showAll", required = false) boolean showAll) {
        try {
            PageDto<PatientDto> patientDtos = fisClient.getPatientsByValue(key, value, filterBy, organization, practitioner, showInactive, page, size, showAll);

            if (patientDtos != null) {
                //TODO: fixear esto
                //patientDtos = updatePatientsWithAuthInfo(patientDtos);
            }

            log.debug("Call to Feign Client: END");
            return patientDtos;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Patient found in the configured FHIR server for the given searchType and searchValue");
            return null;
        }
    }

    @GetMapping(value = "find")
    public PatientDto findPatient(@RequestParam(value = "firstName") String firstName,
                                  @RequestParam(value = "lastName") String lastName,
                                  @RequestParam(value = "birthDate") String birthDate) {
        try {
            return fisClient.findPatient(firstName, lastName, birthDate, userContextService.getUserOrganizationId());
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "Patient was not found");
            return null;
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPatient(@Valid @RequestBody PatientDto patientDto) {
        try {
            String loggedInUser = userContextService.getUserFhirId();
            fisClient.createPatient(patientDto, loggedInUser);
            log.debug("Successfully created a patient");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Patient could not be created in FHIR server");
        }
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updatePatient(@Valid @RequestBody PatientDto patientDto) {
        try {
            String loggedInUser = userContextService.getUserFhirId();
            fisClient.updatePatient(patientDto, loggedInUser);
            log.debug("Successfully updated a patient");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Patient could not be updated in FHIR server");
        }
    }

    @GetMapping("/{patientId}")
    @ResponseStatus(HttpStatus.OK)
    public Object getPatientById(@PathVariable String patientId) {
        try {
            log.debug("Successfully retrieved a patient with the given patientId : " + patientId);
            return fisClient.getPatientById(patientId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the Patient could not be retrieved for given patientId : " + patientId);
            return fe;
        }
    }

    private PageDto<PatientDto> updatePatientsWithUAAInfo(PageDto<PatientDto> patientPageDtos) {
        List<PatientDto> patientDtoList = patientPageDtos.getElements();

        List<String> fhirIds = patientDtoList.stream().map(PatientDto::getId).collect(toList());

        if (fhirIds != null && fhirIds.size() > 0) {
            Map<String, List<ManageUserDto>> map = uaaClient.getUserRoles(fhirIds);

            if (map != null && !map.isEmpty()) {
                List<PatientDto> updatedPatientDtoList = patientDtoList.stream().map(dto -> {
                    List<ManageUserDto> manageUserDtos = map.get(dto.getId());

                    if (manageUserDtos != null && manageUserDtos.size() > 0) {
                        dto.setUaaId(manageUserDtos.stream().findAny().get().getId());
                    } else {
                        dto.setUaaId("");
                    }

                    return dto;
                }).collect(toList());

                patientPageDtos.setElements(updatedPatientDtoList);

                return patientPageDtos;
            }
        }

        return patientPageDtos;
    }


}
