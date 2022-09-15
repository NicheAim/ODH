package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.CarePlanDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;

import java.util.Optional;

public interface CarePlanService {
    PageDto<CarePlanDto> getAllCarePlans(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size);
    PageDto<CarePlanDto> getCarePlanbyPatient(String patientId, Optional<String> searchKey, Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber, Optional<Integer> pageSize, Optional<Boolean> showAll);
    void createCarePlan(CarePlanDto carePlanDto);
}
