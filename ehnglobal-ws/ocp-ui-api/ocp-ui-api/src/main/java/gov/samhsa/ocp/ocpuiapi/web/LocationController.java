package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.LocationDto;
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
public class LocationController {

    private final FisClient fisClient;

    @Autowired
    public LocationController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Autowired
    UserContextService userContextService;

    @GetMapping("/locations")
    public PageDto<LocationDto> getAllLocations(@RequestParam(value = "statusList", required = false) List<String> statusList,
                                                @RequestParam(value = "searchKey", required = false) String searchKey,
                                                @RequestParam(value = "searchValue", required = false) String searchValue,
                                                @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Fetching locations from FHIR Server...");
        PageDto<LocationDto> fisClientResponse = fisClient.getAllLocations(statusList, searchKey, searchValue, pageNumber, pageSize);
        log.info("Got response from FHIR Server...");
        return fisClientResponse;

    }

    @GetMapping("/organizations/{organizationId}/locations")
    public PageDto<LocationDto> getLocationsByOrganization(@PathVariable String organizationId,
                                                           @RequestParam(value = "statusList", required = false) List<String> statusList,
                                                           @RequestParam(value = "searchKey", required = false) String searchKey,
                                                           @RequestParam(value = "searchValue", required = false) String searchValue,
                                                           @RequestParam(value = "assignedToPractitioner", required = false) String assignedToPractitioner,
                                                           @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
                                                           @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        log.info("Fetching locations from FHIR Server for the given OrganizationId: " + organizationId);
        try {
            PageDto<LocationDto> fisClientResponse = fisClient.getLocationsByOrganization(organizationId, statusList, searchKey, searchValue, assignedToPractitioner, pageNumber, pageSize);
            log.info("Got response from FHIR Server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no locations were found in the configured FHIR server for the given OrganizationId");
            return null;
        }
    }

    @GetMapping("/locations/{locationId}")
    public LocationDto getLocation(@PathVariable String locationId) {
        log.info("Fetching locations from FHIR Server for the given LocationId: " + locationId);
        try {
            LocationDto fisClientResponse = fisClient.getLocation(locationId);
            log.info("Got response from FHIR Server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no location was found in the configured FHIR server for the given LocationId");
            return null;
        }
    }

    @GetMapping("/locations/{locationId}/child-location")
    public LocationDto getChildLocation(@PathVariable String locationId) {
        log.info("Fetching child location from FHIR Server for the given LocationId: " + locationId);
        try {
            LocationDto fisClientResponse = fisClient.getChildLocation(locationId);
            log.info("Got response from FHIR Server...");
            return fisClientResponse;
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no child location was found in the configured FHIR server for the given LocationId");
            return null;
        }
    }

    @PostMapping("/organizations/{organizationId}/locations")
    @ResponseStatus(HttpStatus.CREATED)
    public void createLocation(@PathVariable String organizationId,
                               @Valid @RequestBody LocationDto locationDto) {
        log.info("About to create a location");
        try {
            fisClient.createLocation(organizationId, locationDto, userContextService.getUserFhirId());
            log.info("Successfully created a location");
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the location was not created");
        }
    }

    @PutMapping("/organizations/{organizationId}/locations/{locationId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateLocation(@PathVariable String organizationId,
                               @PathVariable String locationId,
                               @Valid @RequestBody LocationDto locationDto) {
        log.info("About to update the location ID: " + locationId);
        try {
            fisClient.updateLocation(organizationId, locationId, locationDto, userContextService.getUserFhirId());
            log.info("Successfully updated the location ID: " + locationId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the location was not updated");
        }
    }

    @PutMapping("/locations/{locationId}/inactive")
    @ResponseStatus(HttpStatus.OK)
    public void inactivateLocation(@PathVariable String locationId) {
        log.info("About to Inactivating the location: " + locationId);
        try {
            fisClient.inactivateLocation(locationId);
            log.info("Successfully inactivated the location: " + locationId);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the location was not inactivated");
        }
    }

    @GetMapping("/location-references")
    public List<ReferenceDto> getAllLocationReferences(@RequestParam(value = "healthcareService") String healthcareService) {
        try {
            return fisClient.getAllLocationReferences(healthcareService);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that the location was not fetched");
            return null;
        }
    }
}
