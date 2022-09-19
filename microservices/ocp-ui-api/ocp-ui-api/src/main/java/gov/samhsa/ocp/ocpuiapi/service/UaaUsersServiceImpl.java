package gov.samhsa.ocp.ocpuiapi.service;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.config.KeycloakSearchClientProperties;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.KeycloakRestClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.OAuth2RestClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.UaaUserTokenRestClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.EmailDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.UaaNameDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.UaaUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.*;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ChangePasswordResponseDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.ResetPasswordRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.RoleToUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.Info;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.UserAttributes;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.UserDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleMappingResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.ws.rs.core.Response;
import java.util.*;

@Slf4j
@Service
public class UaaUsersServiceImpl implements UaaUsersService {

    private static final String OCP_ROLE_ORGANIZATION_ADMINISTRATOR = "ocp.role.organizationAdministrator";
    private static final String OCP_ROLE_OCP_ADMIN = "ocp.role.ocpAdmin";
    private static final String PRACTITIONER = "Practitioner";
    private static final String PATIENT = "Patient";
    private final JwtTokenExtractor jwtTokenExtractor;
    private final UaaUserTokenRestClient uaaUserTokenRestClient;
    private final OAuth2RestClient oAuth2GroupRestClient;
    private final FisClient fisClient;
    private final KeycloakRestClient keycloakRestClient;
    private final KeycloakSearchClientProperties keycloakSearchClientProperties;

    @Autowired
    public UaaUsersServiceImpl(JwtTokenExtractor jwtTokenExtractor, UaaUserTokenRestClient uaaUserTokenRestClient, OAuth2RestClient oAuth2GroupRestClient, FisClient fisClient, KeycloakRestClient keycloakRestClient, KeycloakSearchClientProperties keycloakSearchClientProperties) {
        this.jwtTokenExtractor = jwtTokenExtractor;
        this.uaaUserTokenRestClient = uaaUserTokenRestClient;
        this.oAuth2GroupRestClient = oAuth2GroupRestClient;
        this.fisClient = fisClient;
        this.keycloakRestClient = keycloakRestClient;
        this.keycloakSearchClientProperties = keycloakSearchClientProperties;
    }

    @Override
    public ChangePasswordResponseDto changePassword(ChangePasswordRequestDto changePasswordRequestDto) {
        String userId = jwtTokenExtractor.getValueByKey(JwtTokenKey.USER_ID).toString();
        Assert.hasText(userId, "user_id must have text");
        ChangePasswordResponseDto changePasswordResponseDto = null;
        try {
            changePasswordResponseDto = uaaUserTokenRestClient.changePassword(userId, changePasswordRequestDto);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignExceptionFailToLogin(fe, "User change password failure with userId: ".concat(userId));
        }
        return changePasswordResponseDto;
    }

    @Override
    public ChangePasswordResponseDto resetPassword(String userId, ResetPasswordRequestDto resetPasswordRequestDto) {
        List<String> scopes = (List<String>) jwtTokenExtractor.getValueByKey(JwtTokenKey.SCOPE);
        boolean isOrgOrOcpAdmin = scopes.contains(OCP_ROLE_ORGANIZATION_ADMINISTRATOR) || scopes.contains(OCP_ROLE_OCP_ADMIN);
        Assert.hasText(userId, "user_id must have text");
        Assert.isTrue(isOrgOrOcpAdmin, "This user does not allow to do resetting password.");
        ChangePasswordResponseDto changePasswordResponseDto = null;
        try {
            changePasswordResponseDto = oAuth2GroupRestClient.resetPassword(userId, resetPasswordRequestDto);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignExceptionFailToLogin(fe, "Reset User password failure for userId: ".concat(userId));
        }
        return changePasswordResponseDto;
    }

    @Override
    public void assignRoleToUser(RoleToUserDto roleToUserDto) {
        RealmResource realmResource = keycloakRestClient.getClient().realm(keycloakSearchClientProperties.getRealm());
        ClientRepresentation clientRepresentation = realmResource.clients().findByClientId("ocpUiApi").get(0);
        List<GroupRepresentation> groupRepresentationList = realmResource.groups().groups();
        GroupRepresentation groupRepresentation_based_on_ui = groupRepresentationList.stream().filter(x -> x.getId().equals(roleToUserDto.getGroupId())).findFirst().get();
        RoleRepresentation user_role_representation = realmResource.clients()
                .get(clientRepresentation.getId())
                .roles()
                .get(groupRepresentation_based_on_ui.getName()).toRepresentation();
        UsersResource usersResource = realmResource.users();
        usersResource.get(roleToUserDto.getUserId()).roles().clientLevel(clientRepresentation.getId()).add(Collections.singletonList(user_role_representation));
    }

    @Override
    public void createUser(UserDto userDto) {
        try {
            RealmResource realmResource = keycloakRestClient.getClient().realm(keycloakSearchClientProperties.getRealm());
            //Create user in UAA
            UaaUserDto uaaUserDto = new UaaUserDto();
            uaaUserDto.setUserName(userDto.getUsername());
            uaaUserDto.setPassword(userDto.getPassword());
            uaaUserDto.setActive(true);
            uaaUserDto.setVerified(true);

            if (userDto.getResource().equalsIgnoreCase("Practitioner")) {
                PractitionerDto practitionerDto = fisClient.getPractitioner(userDto.getResourceId());
                UaaNameDto uaaNameDto = new UaaNameDto();
                uaaNameDto.setGivenName(practitionerDto.getName().stream().findFirst().get().getFirstName());
                uaaNameDto.setFamilyName(practitionerDto.getName().stream().findFirst().get().getLastName());
                uaaUserDto.setName(uaaNameDto);
                if (!practitionerDto.getTelecoms().isEmpty() && practitionerDto.getTelecoms() != null) {
                    practitionerDto.getTelecoms().stream().filter(pr -> pr.getSystem().get().equalsIgnoreCase("email")).findAny().ifPresent(email -> {
                        EmailDto emailDto = new EmailDto();
                        emailDto.setValue(email.getValue().get());
                        uaaUserDto.setEmails(Arrays.asList(emailDto));
                    });
                }
            } else {
                PatientDto patientDto = fisClient.getPatientById(userDto.getResourceId());
                UaaNameDto uaaNameDto = new UaaNameDto();
                uaaNameDto.setGivenName(patientDto.getName().stream().findFirst().get().getFirstName());
                uaaNameDto.setFamilyName(patientDto.getName().stream().findFirst().get().getLastName());
                uaaUserDto.setName(uaaNameDto);
                if (!patientDto.getTelecoms().isEmpty() && patientDto.getTelecoms() != null) {
                    patientDto.getTelecoms().stream().filter(pr -> pr.getSystem().get().equalsIgnoreCase("email")).findAny().ifPresent(email -> {
                        EmailDto emailDto = new EmailDto();
                        emailDto.setValue(email.getValue().get());
                        uaaUserDto.setEmails(Arrays.asList(emailDto));
                    });
                }
            }

            UserRepresentation userRepresentation = new UserRepresentation();

            Map<String, List<String>> attributes = new HashMap<>();

//            List<EmailDto> primary_emails = uaaUserDto.getEmails().stream().filter(EmailDto::isPrimary).collect(Collectors.toList());
//            primary_emails.stream().findFirst().ifPresent(x -> {
//                userRepresentation.setEmail(x.getValue());
//                attributes.put("email", Collections.singletonList(x.getValue()));
//            });

            ClientRepresentation clientRepresentation = realmResource.clients().findByClientId("ocpUiApi").get(0);

            log.info("Client role from UI: "+userDto.getRoles().get(0).getRole());

            List<GroupRepresentation> groupRepresentationList = realmResource.groups().groups();

            GroupRepresentation groupRepresentation_based_on_ui = groupRepresentationList.stream().filter(x -> x.getId().equals(userDto.getRoles().get(0).getRole())).findFirst().get();

            RoleRepresentation user_role_representation = realmResource.clients()
                    .get(clientRepresentation.getId())
                    .roles()
                    .get(groupRepresentation_based_on_ui.getName()).toRepresentation();

            JSONObject json_attr = new JSONObject();
            try{
                json_attr.put("id", userDto.getResourceId());
                json_attr.put("resource", userDto.getResource());
                json_attr.put("orgId", userDto.getRoles().get(0).getOrgId());
            }catch (JSONException e) {
                System.out.println(e.getMessage());
            }

            attributes.put("ext_attr",Collections.singletonList(json_attr.toString()));
            attributes.put("email", Collections.singletonList(userDto.getUsername()));

            userRepresentation.setUsername(uaaUserDto.getUserName());
            userRepresentation.setFirstName(uaaUserDto.getName().getGivenName());
            userRepresentation.setEnabled(true);
            userRepresentation.setLastName(uaaUserDto.getName().getFamilyName());
            userRepresentation.setEmailVerified(true);
            userRepresentation.setEmail(userDto.getUsername());
            userRepresentation.setAttributes(attributes);
            userRepresentation.setGroups(Collections.singletonList(groupRepresentation_based_on_ui.getName()));

            Response response = realmResource.users().create(userRepresentation);
            log.info("Response from Keycloak (User creation): "+response.getStatusInfo());
            log.info("User URL: "+response.getLocation());
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            log.info("User ID: "+userId);

            UsersResource usersResource = realmResource.users();
            usersResource.get(userId).roles().clientLevel(clientRepresentation.getId()).add(Collections.singletonList(user_role_representation));

//            UserResourceDto userResourceDto = oAuth2GroupRestClient.createUser(uaaUserDto);

            //Create userinfo in UAA
//            UaaUserInfoDto uaaUserInfoDto = new UaaUserInfoDto();
//            uaaUserInfoDto.setUser_id(Arrays.asList(userResourceDto.getId()));
//            uaaUserInfoDto.setResource(Arrays.asList(userDto.getResource()));
//            uaaUserInfoDto.setId(Arrays.asList(userDto.getResourceId()));
//            uaaUserInfoDto.setOrgId((Arrays.asList(userDto.getRoles().get(0).getOrgId())));
//            oAuth2GroupRestClient.createUserInfo(uaaUserInfoDto);

            //Assign user to role group
//            oAuth2GroupRestClient.addGroupMember(userDto.getRoles().get(0).getRole(), GroupMemberDto.builder().origin("uaa").type("USER").value(userResourceDto.getId()).build());
        } catch (
                FeignException fe) {
            ExceptionUtil.handleUaaException(fe, "Failed to create user for FHIR resource: " + userDto.getResource() + "/" + userDto.getResourceId() + "with username" + userDto.getUsername());
        }
    }

    @Override
    public List<ManageUserDto> getAllUsersByOrganizationId(String organizationId, String resource) {
        PageDto<PractitionerDto> practitioners = fisClient.searchPractitioners(null, null, organizationId, true, null, null, true);
        List<PractitionerDto> fhirPractitioners = practitioners.getElements();

        RealmResource realmResource = keycloakRestClient.getClient().realm(keycloakSearchClientProperties.getRealm());

        UsersResource usersResource = realmResource.users();

        List<ManageUserDto> uaaPractitioners = new ArrayList<>();

        for(UserRepresentation userRepresentation: usersResource.list()){
            Map<String, List<String>> attributes = userRepresentation.getAttributes();
            ManageUserDto manageUserDto =  new ManageUserDto();
            if(attributes != null){
               if(attributes.get("ext_attr") != null){
                   try {
                       List<GroupRepresentation> groups = usersResource.get(userRepresentation.getId()).groups();

                       if(groups.size() > 0) {
                           RoleMappingResource roleMappingResource = usersResource.get(userRepresentation.getId()).roles();
                           String role = roleMappingResource.getAll().getClientMappings().get("ocpUiApi").getMappings().get(0).getName();
                           JSONObject jsonObject = new JSONObject(attributes.get("ext_attr").get(0));
                           JSONObject user_attributes = new JSONObject();
//                           JSONObject user_roles = new JSONObject();
                           JSONObject info_obj = new JSONObject();
                           if(jsonObject.get("orgId").equals(organizationId)) {
                               manageUserDto.setId(userRepresentation.getId());
                               manageUserDto.setUsername(userRepresentation.getUsername());
                               manageUserDto.setGivenName(userRepresentation.getFirstName());
                               manageUserDto.setFamilyName(userRepresentation.getLastName());
                               manageUserDto.setDisplayName(userRepresentation.getUsername());

                               user_attributes.put("resource","Practitioner");
                               user_attributes.put("orgId",jsonObject.get("orgId"));
                               user_attributes.put("id", jsonObject.get("id"));

//                               user_roles.put("roles", role);
                               info_obj.putOpt("user_attributes", user_attributes);
                               info_obj.put("roles", role);

                               //"{\"resource\":\"Practitioner\",\"orgId\":\"orgId\",\"id\":\"id\"}"
                               log.info("User: "+userRepresentation.getUsername());
                               log.info("User org id: "+jsonObject.get("orgId"));
                               log.info("User role: "+role);
                               log.info("User id: "+jsonObject.get("id"));
                               manageUserDto.setInfo(info_obj.toString());
                               manageUserDto.setGroupId(groups.get(0).getId());
                               uaaPractitioners.add(manageUserDto);
                           }
                       }
                   }catch (JSONException e){
                       log.error(e.getMessage());
                   }
                }
            }
        }

        log.info("Searching in uaa");
        log.info("Practioners: "+uaaPractitioners.size());
        //List<ManageUserDto> uaaPractitioners = oAuth2GroupRestClient.getUsers(organizationId, resource, null);

        Map<String, ManageUserDto> map = new HashMap<>();

        for(ManageUserDto uaaUser : uaaPractitioners) {
            String uaaId = this.convertUaaUserToId(uaaUser);
            map.put(uaaId, uaaUser);
        }

      log.info("Map size: "+map.size());
      List<ManageUserDto> mappedUaaUsers = new ArrayList<>();
        for (PractitionerDto fhirUser : fhirPractitioners) {
            ManageUserDto uaaUser = map.get(fhirUser.getLogicalId());

            //some users do not have corresponding account in UAA
//            if (uaaUser == null) {
//                //just create empty ones
//                uaaUser = new ManageUserDto();
//                uaaUser.setId(new Random().nextInt(100000) + "");
//
//                if(fhirUser.getName().get(0) != null) {
//                    uaaUser.setGivenName(fhirUser.getName().get(0).getFirstName());
//                }
//
//                if(fhirUser.getName().get(0) != null) {
//                    uaaUser.setFamilyName(fhirUser.getName().get(0).getLastName());
//                }
//
//                uaaUser.setGroupId("NA");
//                uaaUser.setDisplayName("NA");
//                uaaUser.setDescription("NA");
//                uaaUser.setInfo("NA");
//            }

            Optional<PractitionerRoleDto> role = fhirUser.getPractitionerRoles().stream().findFirst();

            if(uaaUser != null) {
                role.ifPresent(practitionerRoleDto -> uaaUser.setRole(practitionerRoleDto.getCode()));
                mappedUaaUsers.add(uaaUser);
            }
        }

        return mappedUaaUsers;
    }

    @Override
    public List<ManageUserDto> getUserByFhirResouce(String resourceId, String resource) {
        RealmResource realmResource = keycloakRestClient.getClient().realm(keycloakSearchClientProperties.getRealm());

        UsersResource usersResource = realmResource.users();

        List<ManageUserDto> userDtos = new ArrayList<>();

        for(UserRepresentation representation: usersResource.list()){
            Map<String, List<String>> attributes = representation.getAttributes();
            ManageUserDto manageUserDto =  new ManageUserDto();
            if(attributes != null){
                if(attributes.get("ext_atrr") != null){
                    try {
                        List<GroupRepresentation> groups = usersResource.get(representation.getId()).groups();
                        if(groups.size() > 0) {
                            RoleMappingResource roleMappingResource = usersResource.get(representation.getId()).roles();
                            String role = roleMappingResource.getAll().getClientMappings().get("ocpUiApi").getMappings().get(0).getName();
                            JSONObject jsonObject = new JSONObject(attributes.get("ext_attr").get(0));
                            JSONObject user_attributes = new JSONObject();
//                           JSONObject user_roles = new JSONObject();
                            JSONObject info_obj = new JSONObject();
                            if(jsonObject.get("id").equals(resourceId) && jsonObject.get("resource").equals(resource)) {
                                manageUserDto.setId(representation.getId());
                                manageUserDto.setUsername(representation.getUsername());
                                manageUserDto.setGivenName(representation.getFirstName());
                                manageUserDto.setFamilyName(representation.getLastName());
                                manageUserDto.setDisplayName(representation.getUsername());

                                user_attributes.put("resource","Practitioner");
                                user_attributes.put("orgId",jsonObject.get("orgId"));
                                user_attributes.put("id", jsonObject.get("id"));

//                               user_roles.put("roles", role);
                                info_obj.putOpt("user_attributes", user_attributes);
                                info_obj.put("roles", role);

                                //"{\"resource\":\"Practitioner\",\"orgId\":\"orgId\",\"id\":\"id\"}"
                                manageUserDto.setInfo(info_obj.toString());
                                manageUserDto.setGroupId(groups.get(0).getId());
                                userDtos.add(manageUserDto);
                            }
                        }
                    }catch (JSONException e){
                        log.error(e.getMessage());
                    }
                }
            }
        }
        return userDtos;
    }

    private String convertUaaUserToId(ManageUserDto user) {

        String info = user.getInfo();
        Info info_obj = new Info();
        try{
                JSONObject jsonObject = new JSONObject(info);
                JSONObject attributes = (JSONObject) jsonObject.get("user_attributes");

                List<String> user_id = new ArrayList<>();
                List<String> user_resource = new ArrayList<>();
                List<String> user_orgid = new ArrayList<>();

                user_id.add(attributes.get("id").toString());
                user_resource.add(attributes.get("resource").toString());
                user_orgid.add(attributes.get("orgId").toString());

                UserAttributes userAttributes = new UserAttributes();
                userAttributes.setId(user_id);
                userAttributes.setResource(user_resource);
                userAttributes.setOrgId(user_orgid);

                info_obj.setUserAttributes(userAttributes);
                info_obj.setRoles(jsonObject.get("roles"));
            }catch (JSONException e) {
                log.error(e.getMessage());
            }

        return info_obj.getUserAttributes().getId().get(0);
    }

    @Override
    public void deleteUser(String userId) {
//        oAuth2GroupRestClient.deleteUser(userId);
        RealmResource realmResource = keycloakRestClient.getClient().realm(keycloakSearchClientProperties.getRealm());
        realmResource.users().get(userId).remove();
    }
}
