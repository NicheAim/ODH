package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.ConditionDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;

import java.util.Optional;

public interface ConditionService {
    PageDto<ConditionDto> getConditionsforPatient(String patient, Optional<Integer> pagesize, Optional<Integer> pagenumber);
    ConditionDto getConditionById(String conditionid);
    ConditionDto saveconditionforpatient(ConditionDto conditionDto);
    ConditionDto updateCondition(ConditionDto conditionDto, String conditionid);
}
