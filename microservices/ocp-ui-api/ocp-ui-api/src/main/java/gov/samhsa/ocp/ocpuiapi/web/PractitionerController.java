package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.FHIRUaaUserDto;
import gov.samhsa.ocp.ocpuiapi.service.KeycloakService;
import gov.samhsa.ocp.ocpuiapi.service.PractitionerService;
import gov.samhsa.ocp.ocpuiapi.service.PractitionerServiceImpl;
import gov.samhsa.ocp.ocpuiapi.infrastructure.OAuth2RestClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PractitionerDto;
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
import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

@RestController
@Slf4j
@RequestMapping("ocp-fis")
public class PractitionerController {

    public static final String FHIR_CAREMANAGER_ROLE = "CAREMNGR";
    public static final String FHIR_CARECOORDINATOR_ROLE = "171M00000X";
    public static final String UAA_CAREMANAGER = "careManager";
    public static final String UAA_CARECOORDINATOR = "careCoordinator";
    private final FisClient fisClient;
    private final PractitionerService practitionerService;
    private final KeycloakService oAuth2GroupRestClient;

    @Autowired

    public PractitionerController(FisClient fisClient, KeycloakService oAuth2GroupRestClient, PractitionerService practitionerService) {
        this.fisClient = fisClient;
        this.oAuth2GroupRestClient = oAuth2GroupRestClient;
        this.practitionerService = practitionerService;
    }

    public enum SearchType {
        identifier, name
    }

    @Autowired
    UserContextService userContextService;

    @GetMapping("/practitioners/search")
    public PageDto<FHIRUaaUserDto> searchPractitioners(@RequestParam(value = "searchType", required = false) SearchType searchType,
                                                       @RequestParam(value = "searchValue", required = false) String searchValue,
                                                       @RequestParam(value = "organization", required = false) String organization,
                                                       @RequestParam(value = "showInactive", required = false) Boolean showInactive,
                                                       @RequestParam(value = "page", required = false) Integer page,
                                                       @RequestParam(value = "size", required = false) Integer size,
                                                       @RequestParam(value = "showAll", required = false) Boolean showAll,
                                                       @RequestParam(value = "showUser") Optional<Boolean> showUser) {
        log.info("Searching practitioners from FHIR server");
        try {
            return practitionerService.searchPractitioners(searchType, searchValue, organization, showInactive, page, size, showAll, showUser);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no practitioners were found in the configured FHIR server for the given searchType and searchValue");
            return null;
        }
    }

    @PostMapping("/practitioners")
    @ResponseStatus(HttpStatus.CREATED)
    void createPractitioner(@Valid @RequestBody PractitionerDto practitionerDto) {
        try {

            fisClient.createPractitioner(practitionerDto, userContextService.getUserFhirId());
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the practitioner was not created");
        }
    }

    @PutMapping("/practitioners/{practitionerId}")
    @ResponseStatus(HttpStatus.OK)
    public void updatePractitioner(@PathVariable String practitionerId, @Valid @RequestBody PractitionerDto practitionerDto) {
        try {
            fisClient.updatePractitioner(practitionerId, practitionerDto, userContextService.getUserFhirId());

        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the practitioner was not updated");
        }
    }

    @GetMapping("/practitioners/{practitionerId}")
    public PractitionerDto getPractitioner(@PathVariable String practitionerId) {
        try {
            return fisClient.getPractitioner(practitionerId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no practitioner was found");
            return null;
        }
    }

    @GetMapping(value = "practitioners/find")
    public PractitionerDto findPractitioner(@RequestParam(value = "organization", required = false) String organization,
                                            @RequestParam(value = "firstName") String firstName,
                                            @RequestParam(value = "middleName", required = false) String middleName,
                                            @RequestParam(value = "lastName") String lastName,
                                            @RequestParam(value = "identifierType") String identifierType,
                                            @RequestParam(value = "identifier") String identifier) {
        try {
            return fisClient.findPractitioner(organization, firstName, middleName, lastName, identifierType, identifier);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "practitioner was not found");
            return null;
        }
    }

    @GetMapping("/practitioners/practitioner-references")
    public List<ReferenceDto> getPractitionersInOrganizationByPractitionerId(@RequestParam(value = "practitioner", required = false) String practitioner,
                                                                             @RequestParam(value = "organization", required = false) String organization,
                                                                             @RequestParam(value = "location", required = false) String location,
                                                                             @RequestParam(value = "role", required = false) String role) {
        try {
            List<ReferenceDto> fhirPractitioners = fisClient.getPractitionersInOrganizationByPractitionerId(practitioner, organization, location, role);
            List<ReferenceDto> filteredPractitioners = fhirPractitioners;

            if (practitioner == null && organization != null && role != null) {
                //uaaPractitioners will only contain those who have a given role (careCoordinator or careManager)
                String uaaRole = "";
                if (role.equals(FHIR_CAREMANAGER_ROLE)) {
                    uaaRole = UAA_CAREMANAGER;
                } else if (role.equals(FHIR_CARECOORDINATOR_ROLE)) {
                    uaaRole = UAA_CARECOORDINATOR;
                }

                List<String> uaaPrractitioners = oAuth2GroupRestClient.retrievePractitionersByOrganizationAndRole(organization, uaaRole);

                //filter fhirPractitioiners to only include UAA practitioners in result
                Set<String> fhirSet = fhirPractitioners.stream().map(ref -> ref.getReference()).collect(toSet());
                Set<String> uaaSet = uaaPrractitioners.stream().collect(toSet());

                fhirSet.retainAll(uaaSet);
                filteredPractitioners = fhirPractitioners.stream().filter(ref -> fhirSet.contains(ref.getReference())).collect(toList());
            }
            return filteredPractitioners;

        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no practitioner was found in the organization for the given practitioner");
            return null;
        }
    }

    @GetMapping("/practitioners")
    public PageDto<PractitionerDto> getPractitionersByOrganizationAndRole(@RequestParam("organization") String organization,
                                                                          @RequestParam(value = "role", required = false) String role,
                                                                          @RequestParam(value = "page", required = false) Integer page,
                                                                          @RequestParam(value = "size", required = false) Integer size) {
        try {
            return fisClient.getPractitionersByOrganizationAndRole(organization, role, page, size);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no practitioner was found for the given organization and the role (if provided) ");
            return null;
        }
    }

    @PutMapping(value = "/practitioners/{practitionerId}/assign")
    void assignLocationToPractitioner(@PathVariable("practitionerId") String practitionerId,
                                      @RequestParam(value = "organizationId") String organizationId,
                                      @RequestParam(value = "locationId") String locationId) {
        try {
            fisClient.assignLocationToPractitioner(practitionerId, organizationId, locationId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the location was not assigned");
        }
    }

    @PutMapping(value = "/practitioners/{practitionerId}/unassign")
    void unassignLocationToPractitioner(@PathVariable("practitionerId") String practitionerId,
                                        @RequestParam(value = "organizationId") String organizationId,
                                        @RequestParam(value = "locationId") String locationId) {
        try {
            fisClient.unassignLocationToPractitioner(practitionerId, organizationId, locationId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the location was not unassigned");
        }
    }
}
