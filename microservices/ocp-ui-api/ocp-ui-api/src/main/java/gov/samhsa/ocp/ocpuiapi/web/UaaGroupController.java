package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.service.KeycloakService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class UaaGroupController {

    @Autowired
    KeycloakService uaaGroupService;

    @GetMapping("/groups")
    public Object getAllGroups() {
        return uaaGroupService.getAllGroups();
    }

    @GetMapping("/scopes")
    public Object getAllScopes() {
        return uaaGroupService.getAllScopes();
    }
    //COMMENT: methods not yet implemented
//    @PostMapping("/groups")
//    @ResponseStatus(HttpStatus.CREATED)
//    public void createGroup(@Valid @RequestBody GroupRequestDto groupDto) {
//        uaaGroupService.createGroup(groupDto);
//    }

//    @PutMapping("/groups/{groupId}")
//    @ResponseStatus(HttpStatus.OK)
//    public void updateGroup(@PathVariable("groupId") String groupId, @Valid @RequestBody GroupRequestDto groupDto) {
//        uaaGroupService.updateGroup(groupId, groupDto);
//    }



}
