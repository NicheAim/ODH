package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.PlanDefinitionDto;

import java.util.Optional;

public interface PlanDefinitionService {
    PageDto<PlanDefinitionDto> getAllPlans(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size);
}