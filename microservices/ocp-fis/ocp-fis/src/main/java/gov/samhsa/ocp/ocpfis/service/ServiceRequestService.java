package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.ServiceRequestDto;

import java.util.List;
import java.util.Optional;

public interface ServiceRequestService {
    List<ServiceRequestDto> getServiceRequest(Optional<String> patient);
}
