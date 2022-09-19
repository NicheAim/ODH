package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.AppointmentDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.AppointmentParticipantReferenceDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.OutsideParticipant;
import gov.samhsa.ocp.ocpuiapi.service.dto.ParticipantReferenceDto;
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
@RequestMapping("ocp-fis")
@Slf4j
public class AppointmentController {
    private final FisClient fisClient;
    private final UserContextService userContextService;

    @Autowired
    public AppointmentController(FisClient fisClient, UserContextService userContextService) {
        this.fisClient = fisClient;
        this.userContextService = userContextService;
    }

    @PostMapping("/appointments")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAppointment(@Valid @RequestBody AppointmentDto appointmentDto) {
        log.info("About to create an appointment");
        try {
            fisClient.createAppointment(appointmentDto, userContextService.getUserFhirId());
            log.info("Successfully created an appointment");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment was not created");
        }
    }

    @GetMapping("/appointments/search")
    public Object getAppointments(@RequestParam(value = "statusList", required = false) List<String> statusList,
                                  @RequestParam(value = "requesterReference", required = false) String requesterReference,
                                  @RequestParam(value = "patientId", required = false) String patientId,
                                  @RequestParam(value = "practitionerId", required = false) String practitionerId,
                                  @RequestParam(value = "searchKey", required = false) String searchKey,
                                  @RequestParam(value = "searchValue", required = false) String searchValue,
                                  @RequestParam(value = "showPastAppointments", required = false) Boolean showPastAppointments,
                                  @RequestParam(value = "filterDateOption", required = false) String filterDateOption,
                                  @RequestParam(value = "sortByStartTimeAsc", required = false, defaultValue = "true") Boolean sortByStartTimeAsc,
                                  @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                  @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Searching Appointments from FHIR server");
        try {
            Object appointment = fisClient.getAppointments(statusList, requesterReference, patientId, practitionerId, searchKey, searchValue, showPastAppointments, filterDateOption, sortByStartTimeAsc, pageNumber, pageSize);
            log.info("Got Response from FHIR server for Appointment Search");
            return appointment;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Appointments were found in the configured FHIR server for the given searchKey and searchValue");
            return null;
        }
    }

    @GetMapping("/appointments/not-declined-and-not-paginated")
    public List<AppointmentDto> getAppointmentsWithNoPagination(@RequestParam(value = "statusList", required = false) List<String> statusList,
                                                                @RequestParam(value = "patientId", required = false) String patientId,
                                                                @RequestParam(value = "practitionerId", required = false) String practitionerId,
                                                                @RequestParam(value = "searchKey", required = false) String searchKey,
                                                                @RequestParam(value = "searchValue", required = false) String searchValue,
                                                                @RequestParam(value = "showPastAppointments", required = false) Boolean showPastAppointments,
                                                                @RequestParam(value = "sortByStartTimeAsc", required = false, defaultValue = "true") Boolean sortByStartTimeAsc) {
        log.info("Searching Calendar Appointments from FHIR server");
        try {
            List<AppointmentDto> appointmentList = fisClient.getNonDeclinedAppointmentsWithNoPagination(statusList, patientId, practitionerId, searchKey, searchValue, showPastAppointments, sortByStartTimeAsc);
            log.info("Got Response from FHIR server for Calendar Appointment Search");
            return appointmentList;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Calendar Appointments were found in the configured FHIR server for the given searchKey and searchValue");
            return null;
        }
    }

    @GetMapping("/appointments/Practitioner/{practitionerId}/include-care-team-patient")
    public Object getAppointmentsByPractitionerAndAssignedCareTeamPatients(@PathVariable String practitionerId,
                                                                           @RequestParam(value = "statusList", required = false) List<String> statusList,
                                                                           @RequestParam(value = "requesterReference", required = false) String requesterReference,
                                                                           @RequestParam(value = "searchKey", required = false) String searchKey,
                                                                           @RequestParam(value = "searchValue", required = false) String searchValue,
                                                                           @RequestParam(value = "showPastAppointments", required = false) Boolean showPastAppointments,
                                                                           @RequestParam(value = "filterDateOption", required = false) String filterDateOption,
                                                                           @RequestParam(value = "sortByStartTimeAsc", required = false, defaultValue = "true") Boolean sortByStartTimeAsc,
                                                                           @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                                           @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Searching Appointments from FHIR server");
        try {
            Object appointment = fisClient.getAppointmentsByPractitionerAndAssignedCareTeamPatients(practitionerId, statusList, requesterReference, searchKey, searchValue, showPastAppointments, filterDateOption, sortByStartTimeAsc, pageNumber, pageSize);
            log.info("Got Response from FHIR server for Appointment Search");
            return appointment;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no Appointments were found in the configured FHIR server for the given searchKey and searchValue");
            return null;
        }
    }

    @PutMapping("/appointments/{appointmentId}/cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancelAppointment(@PathVariable String appointmentId) {
        log.info("About to cancel the appointment with ID: " + appointmentId);
        try {
            fisClient.cancelAppointment(appointmentId);
            log.debug("Successfully cancelled the appointment.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment could not be cancelled.");
        }
    }

    @PutMapping("/appointments/{appointmentId}/accept")
    @ResponseStatus(HttpStatus.OK)
    public void acceptAppointment(@PathVariable String appointmentId, @RequestParam(value = "actorReference") String actorReference) {
        log.info("About to accept the appointment with ID: " + appointmentId);
        try {
            fisClient.acceptAppointment(appointmentId, actorReference);
            log.debug("Successfully accepted the appointment.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment could not be accepted.");
        }
    }

    @PutMapping("/appointments/{appointmentId}/decline")
    @ResponseStatus(HttpStatus.OK)
    public void declineAppointment(@PathVariable String appointmentId, @RequestParam(value = "actorReference") String actorReference) {
        log.info("About to decline the appointment with ID: " + appointmentId);
        try {
            fisClient.declineAppointment(appointmentId, actorReference);
            log.debug("Successfully declined the appointment.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment could not be declined.");
        }
    }

    @PutMapping("/appointments/{appointmentId}/tentative")
    @ResponseStatus(HttpStatus.OK)
    public void tentativelyAcceptAppointment(@PathVariable String appointmentId, @RequestParam(value = "actorReference") String actorReference) {
        log.info("About to tentatively accept the appointment with ID: " + appointmentId);
        try {
            fisClient.tentativelyAcceptAppointment(appointmentId, actorReference);
            log.debug("Successfully declined the appointment.");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment could not be tentatively accepted.");
        }
    }


    @PutMapping("/appointments/{appointmentId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateAppointment(@PathVariable String appointmentId, @Valid @RequestBody AppointmentDto appointmentDto) {
        log.info("About to update the appointment ID: " + appointmentId);
        try {
            fisClient.updateAppointment(appointmentId, appointmentDto, userContextService.getUserFhirId());
            log.info("Successfully updated the appointment ID: " + appointmentId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment was not updated");
        }
    }

    @GetMapping("/appointments/{appointmentId}")
    public AppointmentDto getAppointmentById(@PathVariable String appointmentId) {
        log.info("Fetching appointment from FHIR Server for the given appointmentId: " + appointmentId);
        try {
            AppointmentDto fisClientResponse = fisClient.getAppointmentById(appointmentId);
            log.info("Got response from FHIR Server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the appointment was not found");
            return null;
        }
    }

    @GetMapping("/patients/{patientId}/appointmentParticipants")
    public List<ParticipantReferenceDto> getAppointmentParticipants(@PathVariable String patientId,
                                                                    @RequestParam(value = "roles", required = false) List<String> roles,
                                                                    @RequestParam(value = "appointmentId", required = false) String appointmentId) {

        log.info("Fetching appointment participants from FHIR Server for the given PatientId: " + patientId);
        try {
            List<ParticipantReferenceDto> fisClientResponse = fisClient.getAppointmentParticipants(patientId, roles, appointmentId);
            log.info("Got response from FHIR Server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no participants were found for the given patient and the roles");
            return null;
        }
    }

    @GetMapping(value = "/appointments/healthcare-service-references")
    public List<AppointmentParticipantReferenceDto> getHealthcareServiceReferences(@RequestParam(value = "resourceType") String searchType,
                                                                                   @RequestParam(value = "resourceValue") String searchValue) {
        try {
            List<AppointmentParticipantReferenceDto> fisClientResponse = fisClient.getHealthcareServiceReferences(searchType, searchValue);
            log.info("Got response from FHIR server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "That no healthcare services were found");
            return null;
        }
    }


    @GetMapping(value = "/appointments/location-references")
    public List<AppointmentParticipantReferenceDto> getAllLocationReferences(@RequestParam(value = "resourceType") String resourceType,
                                                                             @RequestParam(value = "resourceValue") String resourceValue) {
        try {
            List<AppointmentParticipantReferenceDto> fisClientResponse = fisClient.getAllLocationReferences(resourceType, resourceValue);
            log.info("Got response from FHIR server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "That no locations were found");
            return null;
        }

    }

    @GetMapping(value = "/appointments/practitioner-references")
    public List<AppointmentParticipantReferenceDto> getPractitionersReferences(@RequestParam(value = "resourceType") String resourceType,
                                                                               @RequestParam(value = "resourceValue") String resourceValue) {
        try {
            List<AppointmentParticipantReferenceDto> fisClientResponse = fisClient.getPractitionersReferences(resourceType, resourceValue);
            log.info("Got response from FHIR server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "That no practitioners were found");
            return null;
        }
    }

    @GetMapping("/appointments/outside-organization-participants/search")
    public List<OutsideParticipant> searchOutsideParticipants(@RequestParam(value = "patient", required = false) String patient,
                                                              @RequestParam(value = "participantType") String participantType,
                                                              @RequestParam(value = "name") String name,
                                                              @RequestParam(value = "organization", required = false) String organization,
                                                              @RequestParam(value = "page", required = false) Integer page,
                                                              @RequestParam(value = "size", required = false) Integer size,
                                                              @RequestParam(value = "showAll", required = false) Boolean showAll) {
        return fisClient.searchOutsideParticipants(patient, participantType, name, organization, page, size, showAll);
    }
}

