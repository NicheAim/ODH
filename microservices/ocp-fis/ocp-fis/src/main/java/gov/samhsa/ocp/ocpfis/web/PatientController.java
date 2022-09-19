package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.PatientService;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.PatientDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(value = {"/patients","/fhir/Patient"})
public class PatientController {

    public enum SearchType {
        identifier, name, logicalId
    }

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }


    @GetMapping("/search")
    public PageDto<PatientDto> getPatientsByValue(@RequestParam(value = "type", defaultValue = "name") Optional<String> searchKey,
                                                  @RequestParam(value = "value") Optional<String> searchValue,
                                                  @RequestParam(value = "filterBy") Optional<String> filterKey,
                                                  @RequestParam(value = "organization") Optional<String> organization,
                                                  @RequestParam(value = "practitioner") Optional<String> practitioner,
                                                  @RequestParam(value = "showInactive", defaultValue = "false") Optional<Boolean> showInactive,
                                                  @RequestParam Optional<Integer> page,
                                                  @RequestParam Optional<Integer> size,
                                                  @RequestParam(value = "showAll") Optional<Boolean> showAll) {
        return patientService.getPatientsByValue(searchKey, searchValue, filterKey, organization, practitioner, showInactive, page, size, showAll);
    }

    @GetMapping(value = "find")
    public PatientDto findPatient(@RequestParam(value = "firstName") String firstName,
                                  @RequestParam(value = "lastName") String lastName,
                                  @RequestParam(value = "birthDate") String birthDate,
                                  @RequestParam(value = "orgId") String orgId) {
/*        PatientDto patient = patientService.getPatientById("530");
        if (firstName.equalsIgnoreCase("bob"))
            return patient;
        if (firstName.equalsIgnoreCase("bobo")) {
            patient.setMrn(null);
            return patient;
        } else throw new NoDataFoundException("No patient found");*/
        return patientService.findPatient(birthDate, firstName, lastName, orgId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPatient(@Valid @RequestBody PatientDto patientDto, @RequestParam(value = "loggedInUser") Optional<String> loggedInUser) {
        patientService.createPatient(patientDto, loggedInUser);
        log.info("Patient successfully created");
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updatePatient(@Valid @RequestBody PatientDto patientDto, @RequestParam(value = "loggedInUser") Optional<String> loggedInUser) {
        patientService.updatePatient(patientDto, loggedInUser);
        log.info("Patient successfully updated");
    }

    @GetMapping("/{patientId}")
    public PatientDto getPatientById(@PathVariable String patientId) {
        return patientService.getPatientById(patientId);
    }

    @GetMapping
    PageDto<PatientDto> getPatients(@RequestParam(value = "practitioner") Optional<String> practitioner,
                                    @RequestParam(value = "searchKey") Optional<String> searchKey,
                                    @RequestParam(value = "searchValue") Optional<String> searchValue,
                                    @RequestParam(value = "showInActive") Optional<Boolean> showInactive,
                                    @RequestParam(value = "pageNumber") Optional<Integer> pageNumber,
                                    @RequestParam(value = "pageSize") Optional<Integer> pageSize) {
        return patientService.getPatientsByPractitioner(practitioner, searchKey, searchValue, showInactive, pageNumber, pageSize);
    }

}