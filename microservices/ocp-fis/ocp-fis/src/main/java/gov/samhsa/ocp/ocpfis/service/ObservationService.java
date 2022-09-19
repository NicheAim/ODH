package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.ObservationDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;

import java.util.List;
import java.util.Optional;

public interface ObservationService {

    ObservationDto getObservationId(String id);

    PageDto<ObservationDto> getAllObservations(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size);

    void createObservation(ObservationDto organizationDto);

    void updateObservation(ObservationDto observationDto,String id);

    PageDto<ObservationDto> getRelatedObservations(String patient, Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size);

}
