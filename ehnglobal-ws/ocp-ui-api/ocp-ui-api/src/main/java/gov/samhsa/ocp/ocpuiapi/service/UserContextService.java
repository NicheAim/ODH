package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.service.dto.UserContextDto;

public interface UserContextService {
        String getUserOrganizationId();
        String getUserResourceId();
        UserContextServiceImpl.UserType getUserResourceType();
        UserContextDto getUserContext();
        String getUserFhirId();
}
