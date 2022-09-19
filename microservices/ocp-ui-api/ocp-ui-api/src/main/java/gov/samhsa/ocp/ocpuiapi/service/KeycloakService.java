package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.UserWrapperDto;

import java.util.List;
import java.util.Map;

public interface KeycloakService {
    List<GroupDto> getAllGroups();

    List<GroupDto> getAllScopes();

    UserWrapperDto getAllUsers();

    List<ManageUserDto> getAllUsersByAttributes(String keyAttr1, String valueAttr1, String keyAttr2, String valueAttr2);

    List<String> retrievePractitionersByOrganizationAndRole(String organizationId, String authRole);

    Map<String, List<ManageUserDto>> getUserRoles(List<String> fhirIds);

}
