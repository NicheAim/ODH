package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.ServiceRequestDto;
import org.hl7.fhir.r4.model.ServiceRequest;

public class ServiceRequestToServiceRequestDtoMap {
    public static ServiceRequestDto map(ServiceRequest serviceRequest) {
        ServiceRequestDto serviceRequestDto = new ServiceRequestDto();

        serviceRequestDto.setId(serviceRequest.getId());
        serviceRequestDto.setIntent(String.valueOf(serviceRequest.getIntent()));
        serviceRequestDto.setPriority(String.valueOf(serviceRequest.getPriority()));
        serviceRequestDto.setRequester(ReferenceDto.builder()
                .reference((serviceRequest.getRequester().getReference())).build());
        serviceRequestDto.setStatus(String.valueOf(serviceRequest.getStatus()));
        serviceRequestDto.setSubject(ReferenceDto.builder()
                .reference(serviceRequest.getSubject().getReference()).build());
        return serviceRequestDto;
    }
}
