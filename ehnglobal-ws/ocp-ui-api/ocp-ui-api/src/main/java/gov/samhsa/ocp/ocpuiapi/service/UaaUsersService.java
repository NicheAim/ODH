package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordResponseDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ResetPasswordRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.RoleToUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.UserDto;

import java.util.List;

public interface UaaUsersService {
    ChangePasswordResponseDto changePassword(ChangePasswordRequestDto changePasswordRequestDto);

    ChangePasswordResponseDto resetPassword(String userId, ResetPasswordRequestDto resetPasswordRequestDto);

    public void assignRoleToUser(RoleToUserDto roleToUserDto);

    public void createUser(UserDto userDto);

    public void deleteUser(String userId);

    public List<ManageUserDto> getAllUsersByOrganizationId(String organizationId, String resource);

    public List<ManageUserDto> getUserByFhirResouce(String resourceId, String resource);
}
