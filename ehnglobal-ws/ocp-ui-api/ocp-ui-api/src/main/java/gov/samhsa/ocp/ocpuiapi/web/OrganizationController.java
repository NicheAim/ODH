package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.OrganizationDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
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
@Slf4j
@RequestMapping("ocp-fis")

public class OrganizationController {


    private final FisClient fisClient;

    @Autowired
    public OrganizationController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Autowired
    UserContextService userContextService;

    // Todo: Resolve endpoint conflicts with getOrganizationsByPractitioner
    @GetMapping("/organizations/all")
    public PageDto<OrganizationDto> getOrganizations(@RequestParam(value = "showInactive", required = false) boolean showInactive,
                                                     @RequestParam(value = "page", required = false) Integer page,
                                                     @RequestParam(value = "size", required = false) Integer size) {
        return fisClient.getOrganizations(showInactive, page, size);
    }

    @GetMapping("/organizations/{organizationId}")
    public OrganizationDto searchOrganizations(@PathVariable String organizationId) {
        log.info("Searching organizations from FHIR server");
        try {
            OrganizationDto organization = fisClient.getOrganization(organizationId);
            log.info("Got response from FHIR server for get organization");
            return organization;
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no organizations were found found in the configured FHIR server for the given organization ID");
            return null;
        }
    }

    @GetMapping("/organizations/search")
    public PageDto<OrganizationDto> searchOrganizations(@RequestParam(value = "searchType", required = false) String searchType,
                                                        @RequestParam(value = "searchValue", required = false) String searchValue,
                                                        @RequestParam(value = "showInactive", required = false) boolean showInactive,
                                                        @RequestParam(value = "page", required = false) Integer page,
                                                        @RequestParam(value = "size", required = false) Integer size,
                                                        @RequestParam(value = "showAll", required = false) boolean showAll) {
        log.info("Searching organizations from FHIR server");
        try {
            PageDto<OrganizationDto> organizations = fisClient.searchOrganizations(searchType, searchValue, showInactive, page, size, showAll);
            log.info("Got response from FHIR server for organization search");
            return organizations;
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no organizations were found found in the configured FHIR server for the given searchType and searchValue");
            return null;
        }
    }

    @PostMapping("/organizations")
    @ResponseStatus(HttpStatus.CREATED)
    public void createOrganization(@Valid @RequestBody OrganizationDto organizationDto) {
        log.info("About to create a organization");
        try {
            fisClient.createOrganization(organizationDto, userContextService.getUserFhirId());
            log.info("Successfully created the organization");
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the organization was not created");
        }
    }

    @PutMapping("/organizations/{organizationId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateOrganization(@PathVariable String organizationId, @Valid @RequestBody OrganizationDto organizationDto) {

        log.info("About to update the organization");
        try {
            fisClient.updateOrganization(organizationId, organizationDto, userContextService.getUserFhirId());
            log.info("Successfully updated the organization");
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the organization was not updated");
        }
    }

    @PutMapping("/organizations/{organizationId}/inactive")
    @ResponseStatus(HttpStatus.OK)
    public void inactivateOrganization(@PathVariable String organizationId) {
        log.info("About to Inactivating the organization: " + organizationId);
        try {
            fisClient.inactivateOrganization(organizationId);
            log.info("Successfully inactivated the organization: " + organizationId);
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the organization was not inactivated");
        }
    }

    @GetMapping("/organizations")
    public List<ReferenceDto> getOrganizationsByPractitioner(@RequestParam(value = "practitioner") String practitioner) {
        try {
            return fisClient.getOrganizationsByPractitioner(practitioner);
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no organizations were found for the given practitioner Id");
            return null;
        }
    }

    public enum SearchType {
        identifier, name, logicalId
    }

}
