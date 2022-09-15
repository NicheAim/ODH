package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.GoalDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import org.hl7.fhir.r4.model.Goal;

import java.util.Optional;

public interface GoalService {
    PageDto<GoalDto> getGoalbyPatientId(String patientId, Optional<String> searchKey, Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber, Optional<Integer> pageSize, Optional<Boolean> showAll);
    PageDto<GoalDto> getAllGoals(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size);
    GoalDto getGoal(String id);

    void createGoal(GoalDto goalDto, Optional<String> planid, Optional<String> practitionerid, String requester, Optional<String> userorgid);
    void updateGoal(GoalDto goalDto, Optional<String> planid, Optional<String> practitionerid, Optional<String> userorgid);
}
