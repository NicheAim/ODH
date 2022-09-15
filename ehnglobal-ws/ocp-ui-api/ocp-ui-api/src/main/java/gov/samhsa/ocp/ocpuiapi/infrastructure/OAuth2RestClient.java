package gov.samhsa.ocp.ocpuiapi.infrastructure;

import gov.samhsa.ocp.ocpuiapi.config.OAuth2FeignClientCredentialsConfig;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.UaaUserDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.UaaUserInfoDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordResponseDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ResetPasswordRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.RoleToUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupMemberDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.UserResourceDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.UserWrapperDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@FeignClient(name = "oauth2GroupRestClient", url = "${ocp.ocp-ui-api.oauth2.authorization-server-endpoint}", configuration = OAuth2FeignClientCredentialsConfig.class)
public interface OAuth2RestClient {

    @RequestMapping(value = "/Groups/ocp-groups", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    List<GroupDto> getAllGroups();

    @RequestMapping(value = "/Groups/ocp-scopes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    List<GroupDto> getAllScopes();

    @RequestMapping(value = "/Users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    UserWrapperDto getAllUsers();

    @RequestMapping(value = "/userinfos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    List<ManageUserDto> getUsers(@RequestParam(value = "organizationId") String organizationId, @RequestParam(value = "resource", required = true) String resource, @RequestParam(value = "resourceId") String resourceId);

    @RequestMapping(value = "/user-roles", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Map<String, List<ManageUserDto>> getUserRoles(@RequestParam(value = "fhirIds") List<String> fhirIds);

    @RequestMapping(value = "/Groups/ocp", method = RequestMethod.POST)
    void createGroup(@Valid @RequestBody GroupRequestDto groupDto);

    @RequestMapping(value = "/Groups/ocp/{groupId}", method = RequestMethod.PUT)
    void updateGroup(@PathVariable("groupId") String groupId, @RequestBody GroupRequestDto groupDto);

    @RequestMapping(value = "/assign-role-to-user", method = RequestMethod.POST)
    void assignRoleToUser(@Valid @RequestBody RoleToUserDto roleToUserDto);

    @RequestMapping(value = "/Users", method = RequestMethod.POST)
    UserResourceDto createUser(@Valid @RequestBody UaaUserDto uaaUserDto);

    @RequestMapping(value = "/userinfo", method = RequestMethod.POST)
    void createUserInfo(@Valid @RequestBody UaaUserInfoDto uaaUserInfoDto);

    @RequestMapping(value = "/Groups/{groupId}/members", method = RequestMethod.POST)
    void addGroupMember(@PathVariable("groupId") String groupId, @Valid @RequestBody GroupMemberDto groupMemberDto);

    @RequestMapping(value = "/Users/{userId}/password", method = RequestMethod.PUT)
    ChangePasswordResponseDto resetPassword(@PathVariable("userId") String userId, ResetPasswordRequestDto resetPasswordRequestDto);

    @RequestMapping(value = "/practitionerByOrganizationAndRole", method = RequestMethod.GET)
    List<String> retrievePractitionersByOrganizationAndRole(@RequestParam(required = true, value = "organization") String organizationId, @RequestParam(required = false, value = "role") String uaaRole);

    @RequestMapping(value = "/Users/{userId}", method = RequestMethod.DELETE)
    void deleteUser(@PathVariable("userId") String userId);

}
