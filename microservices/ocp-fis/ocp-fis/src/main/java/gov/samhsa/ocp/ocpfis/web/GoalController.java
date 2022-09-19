package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.GoalService;
import gov.samhsa.ocp.ocpfis.service.dto.GoalDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/goals")
public class GoalController {

    @Autowired
    GoalService goalService;

    @GetMapping
    public PageDto<GoalDto> getAllGoals(@RequestParam Optional<Boolean> showInactive, @RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size) {
        return goalService.getAllGoals(showInactive, page, size);
    }

    @GetMapping("/search")
    public PageDto<GoalDto> getGoalbyPatientId(
            @RequestParam String patientId,
            @RequestParam Optional<String> searchKey,
            @RequestParam Optional<String> searchValue,
            @RequestParam Optional<Boolean> showInActive,
            @RequestParam Optional<Integer> pageNumber,
            @RequestParam Optional<Integer> pageSize,
            @RequestParam Optional<Boolean> showAll) {
        return goalService.getGoalbyPatientId(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createGoal(@Valid @RequestBody GoalDto goalDto,
                           @RequestParam(value = "planid") Optional<String> planid,
                           @RequestParam(value = "practitionerid") Optional<String> practitionerid,
                           @RequestParam(value = "requester") String requester,
                           @RequestParam(value = "userorgid") Optional<String> orgid){
        goalService.createGoal(goalDto, planid, practitionerid, requester, orgid);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateGoal(@Valid @RequestBody GoalDto goalDto,
                           @RequestParam(value = "planid") Optional<String> planid,
                           @RequestParam(value = "practitionerid") Optional<String> practitionerid,
                           @RequestParam(value = "userorgid") Optional<String> userorgid){
        goalService.updateGoal(goalDto, planid, practitionerid, userorgid);
    }

    @GetMapping("/{goalId}")
    public GoalDto getGoal(@PathVariable String goalId) {
        return goalService.getGoal(goalId);
    }

}
