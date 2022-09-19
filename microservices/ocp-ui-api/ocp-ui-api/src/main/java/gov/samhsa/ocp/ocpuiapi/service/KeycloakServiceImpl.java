package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.KeycloakRestClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user.*;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import lombok.Value;
import gov.samhsa.ocp.ocpuiapi.config.KeycloakSearchClientProperties;

@Service
@Slf4j
public class KeycloakServiceImpl implements KeycloakService{

    private KeycloakRestClient client;
    private KeycloakSearchClientProperties keycloakSearchClientProperties;

    @Autowired
    public KeycloakServiceImpl(KeycloakRestClient client, KeycloakSearchClientProperties keycloakSearchClientProperties) {
        this.client = client;
        this.keycloakSearchClientProperties = keycloakSearchClientProperties;
    }

    @Override
    public List<GroupDto> getAllGroups() {
        Keycloak keycloak = client.getClient();
        List<GroupDto> groupDtoList = new ArrayList<>();
        List<GroupRepresentation> groupRepresentationList = keycloak.realm(keycloakSearchClientProperties.getRealm()).groups().groups();
        for(GroupRepresentation group : groupRepresentationList){
            GroupDto groupDto = new GroupDto();
            groupDto.setId(group.getId());
            groupDto.setDisplayName(group.getName());
            groupDto.setDescription(group.getName());
            groupDto.setScopeId(group.getId());

            groupDtoList.add(groupDto);
        }

        return groupDtoList;
    }

    @Override
    public List<GroupDto> getAllScopes() {
        return this.getAllGroups();
    }

    @Override
    public UserWrapperDto getAllUsers() {
        Keycloak keycloak = client.getClient();
        List<UserResourceDto> resources = new ArrayList<>();
        List<UserRepresentation> users = keycloak.realm(keycloakSearchClientProperties.getRealm()).users().list();
        for(UserRepresentation userRep : users){
            UserResourceDto user = new UserResourceDto();
            user.setId(userRep.getId());
            UserMetaDto metaDto = new UserMetaDto();
            metaDto.setVersion(1);
            metaDto.setCreated(userRep.getCreatedTimestamp().toString());
            metaDto.setLastModified(userRep.getCreatedTimestamp().toString());
            user.setMeta(metaDto);
            user.setUserName(userRep.getUsername());
            UserNameDto userNameDto = new UserNameDto();
            userNameDto.setFamilyName(userRep.getLastName());
            userNameDto.setGivenName(userRep.getFirstName());
            user.setName(userNameDto);
            List<UserEmailDto> emails = new ArrayList<>();
            emails.add(new UserEmailDto(userRep.getEmail(), true, null));
            user.setEmails(emails);
            List<String> groups = userRep.getGroups();
            List<UserGroupDto> userGroups = new ArrayList<>();
            for(String grp: groups){
                UserGroupDto userGroupDto = new UserGroupDto();
                userGroupDto.setValue(grp);
                userGroupDto.setDisplay(grp);
                userGroupDto.setType(grp);
                userGroups.add(userGroupDto);
            }
            user.setGroups(userGroups);
            user.setActive(userRep.isEnabled());
            user.setVerified(userRep.isEmailVerified());
            user.setOrigin(userRep.getOrigin());
            Map<String, List<String>> attributes = userRep.getAttributes();
            Map<String, Object> additionalProperties = new HashMap<String, Object>(attributes);
            user.setAdditionalProperties(additionalProperties);
            resources.add(user);
        }
        UserWrapperDto result = new UserWrapperDto();
        result.setResources(resources);
        return result;
    }

    @Override
    public List<ManageUserDto> getAllUsersByAttributes(String keyAttr1, String valueAttr1, String keyAttr2, String valueAttr2) {
        Keycloak keycloak = client.getClient();
        List<ManageUserDto> result = new ArrayList<>();
        List<UserRepresentation> users = keycloak.realm(keycloakSearchClientProperties.getRealm()).users().list();
        for(UserRepresentation userRep : users){
            Map<String, List<String>> attributes = userRep.getAttributes();
            for (Map.Entry<String,List<String>> entry : attributes.entrySet()){
                if(entry.getKey().equals("ext_attr")){
                    try {
                        JSONObject jsonObject = new JSONObject(entry.getValue().get(0));
                        if(jsonObject.getString(keyAttr1).equals(valueAttr1) && jsonObject.getString(keyAttr2).equals(valueAttr2)){
                            ManageUserDto user = new ManageUserDto();
                            user.setDescription(userRep.getOrigin());
                            user.setUsername(userRep.getUsername());
                            user.setGroupId(userRep.getGroups().get(0));
                            user.setGivenName(userRep.getFirstName());
                            user.setFamilyName(userRep.getLastName());
                            user.setDisplayName(userRep.getFirstName() + " " + userRep.getLastName());
                            result.add(user);
                        }
                    }catch (JSONException err){
                        log.error("getAllUsers. Error parsing json attribute {}", err.toString());
                    }
                }
            }
        }
        return result;
    }

    @Override
    public List<String> retrievePractitionersByOrganizationAndRole(String organizationId, String authRole) {
        List<String> result = new ArrayList<>();
        Keycloak keycloak = client.getClient();
        Optional<GroupRepresentation> grp = keycloak.realm(keycloakSearchClientProperties.getRealm()).groups().groups().stream().
                filter(group -> group.getName().equals("ocp.role." + authRole)).findFirst();
        List<UserRepresentation> users = keycloak.realm(keycloakSearchClientProperties.getRealm()).groups().group(grp.get().getId()).members();
        for(UserRepresentation userRep : users){
            if (organizationId != null && userRep.getAttributes().get("ext_attr") != null
                    && userRep.getAttributes().get("ext_attr").get(0).contains(organizationId)) {
                try {
                    JSONObject jsonObject = new JSONObject(userRep.getAttributes().get("ext_attr").get(0));
                    result.add("Practitioner/" + jsonObject.getString("id"));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    @Override
    public Map<String, List<ManageUserDto>> getUserRoles(List<String> fhirIds) {
        Keycloak keycloak = client.getClient();
        Map<String, List<ManageUserDto>> result = new HashMap<>();
        List<UserRepresentation> users = keycloak.realm(keycloakSearchClientProperties.getRealm()).users().list();
        for(UserRepresentation userRep : users){
            Map<String, List<String>> attributes = userRep.getAttributes();
            if(attributes != null && attributes.entrySet() != null){
                for (Map.Entry<String,List<String>> entry : attributes.entrySet()){
                    if(entry.getKey().equals("ext_attr")){
                        try {
                            JSONObject jsonObject = new JSONObject(entry.getValue().get(0));
                            if(fhirIds.contains(jsonObject.getString("id"))){
                                ManageUserDto user = new ManageUserDto();
                                user.setDescription(userRep.getUsername());
                                user.setUsername(userRep.getUsername());
                                if(userRep.getGroups() != null && userRep.getGroups().size() > 0){
                                    user.setGroupId(userRep.getGroups().get(0));
                                }
                                user.setGivenName(userRep.getFirstName());
                                user.setFamilyName(userRep.getLastName());
                                user.setDisplayName(userRep.getFirstName() + " " + userRep.getLastName());
                                user.setInfo(entry.getValue().get(0));
                                List<ManageUserDto> val;
                                if(result.get(jsonObject.getString("id")) == null ){
                                    val = new ArrayList<ManageUserDto>();
                                    result.put(jsonObject.getString("id"), val);
                                }else {
                                    val = result.get(jsonObject.getString("id"));
                                }
                                val.add(user);
                                result.put(jsonObject.getString("id"), val);
                            }
                        }catch (JSONException err){
                            log.error("getUserRoles. Error parsing json attribute {}", err.toString());
                        }
                    }
                }
            }
        }
        return result;
    }
}
