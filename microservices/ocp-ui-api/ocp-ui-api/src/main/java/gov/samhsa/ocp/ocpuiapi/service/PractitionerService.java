package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.FHIRUaaUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.web.PractitionerController;

import java.util.Optional;

public interface PractitionerService {

    PageDto<FHIRUaaUserDto> searchPractitioners(PractitionerController.SearchType searchType,
                                                String searchValue,
                                                String organization,
                                                Boolean showInactive,
                                                Integer page,
                                                Integer size,
                                                Boolean showAll,
                                                Optional<Boolean> showUser);
}
