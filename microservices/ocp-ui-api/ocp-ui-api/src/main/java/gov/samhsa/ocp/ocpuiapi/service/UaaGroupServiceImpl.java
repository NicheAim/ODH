package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.OAuth2RestClient;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupRequestDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.uaa.group.GroupWithScopesDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class UaaGroupServiceImpl implements UaaGroupService {

    @Autowired
    OAuth2RestClient oAuth2GroupRestClient;

    @Autowired
    FisClient fisClient;

    @Override
    public Object getAllGroups() {
        List<GroupDto> groups = displayPatientAsClient(oAuth2GroupRestClient.getAllGroups());

        Map<String, GroupWithScopesDto> map = new HashMap<>();

        for (GroupDto groupDto : groups) {
            GroupWithScopesDto groupWithScopesDto = map.get(groupDto.getId());
            if (map.get(groupDto.getId()) == null) {
                GroupWithScopesDto newGroupWithScopesDto = new GroupWithScopesDto();

                newGroupWithScopesDto.setId(groupDto.getId());
                newGroupWithScopesDto.setDisplayName(groupDto.getDisplayName());
                newGroupWithScopesDto.setDescription(groupDto.getDescription());
                List<String> scopes = new ArrayList<>();
                scopes.add(groupDto.getScopeId());
                newGroupWithScopesDto.setScopes(scopes);

                map.put(groupDto.getId(), newGroupWithScopesDto);
            } else {
                List<String> scopes = groupWithScopesDto.getScopes();

                scopes.add(groupDto.getScopeId());
            }
        }

        return map.values();
    }

    private List<GroupDto> displayPatientAsClient(List<GroupDto> groupDtos){
        groupDtos.stream().forEach(valueSetDto -> {
            if(valueSetDto.getDisplayName().contains("patient"))
                valueSetDto.setDisplayName(valueSetDto.getDisplayName().replace("patient", "client"));
            if(valueSetDto.getDescription().contains("Patient"))
                valueSetDto.setDescription(valueSetDto.getDescription().replace("Patient", "Client"));
        });
        return groupDtos;
    }

    @Override
    public Object getAllScopes() {
        return displayPatientAsClient(oAuth2GroupRestClient.getAllScopes());
    }


    @Override
    public void createGroup(GroupRequestDto groupRequestDto) {
        oAuth2GroupRestClient.createGroup(groupRequestDto);
    }

    @Override
    public void updateGroup(String groupId, GroupRequestDto groupDto) {
        oAuth2GroupRestClient.updateGroup(groupId, groupDto);
    }


}
