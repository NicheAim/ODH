package gov.samhsa.ocp.ocpfis.infrastructure;

import gov.samhsa.ocp.ocpfis.service.dto.PatientDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;


@FeignClient(name = "ocp-hie-api", url = "${ribbon.listOfServers}")
public interface MintClient {

    @RequestMapping(value = "/patients/find", method = RequestMethod.GET)
    PatientDto findPatient(@RequestParam(value = "orgName") String orgName,
                           @RequestParam(value = "firstName") String firstName,
                           @RequestParam(value = "lastName") String lastName,
                           @RequestParam(value = "birthDate") String birthDate
                           );

    @RequestMapping(value = "/patients", method = RequestMethod.POST)
    boolean createPatient(@Valid @RequestBody PatientDto patientDto);

    @RequestMapping(value = "/patients", method = RequestMethod.PUT)
    void updatePatient(@Valid @RequestBody PatientDto patientDto);
}
