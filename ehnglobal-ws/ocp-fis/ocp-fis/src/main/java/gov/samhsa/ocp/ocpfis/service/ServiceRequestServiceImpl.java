package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.dto.ServiceRequestDto;
import gov.samhsa.ocp.ocpfis.service.mapping.ServiceRequestToServiceRequestDtoMap;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.ResourceType;
import org.hl7.fhir.r4.model.ServiceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static ca.uhn.fhir.rest.api.Constants.PARAM_LASTUPDATED;
import static java.util.stream.Collectors.toList;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private final IGenericClient fhirClient;
    private final FisProperties fisProperties;

    @Autowired
    public ServiceRequestServiceImpl(IGenericClient fhirClient, FisProperties fisProperties) {
        this.fhirClient = fhirClient;
        this.fisProperties = fisProperties;
    }

    private void setRollupNumbers(ServiceRequest serviceRequest) {

    }

    private IQuery getReferralsIQuery(Optional<String> patientId) {
        IQuery iQuery = fhirClient.search().forResource(ServiceRequest.class).sort().descending(PARAM_LASTUPDATED);
        patientId.ifPresent(patient -> iQuery.where(new ReferenceClientParam("subject").hasId(patient)));
        return FhirOperationUtil.setNoCacheControlDirective(iQuery);
    }

    private List<ServiceRequestDto> getServiceRequestDtos(IQuery iQuery) {
        Bundle firstPageReferralBundle = (Bundle) iQuery
                .returnBundle(Bundle.class)
                .execute();

        if(firstPageReferralBundle == null || firstPageReferralBundle.getEntry().size() < 1) {
            return new ArrayList<>();
        }

        List<Bundle.BundleEntryComponent> retreivedReferrals = FhirOperationUtil
                .getAllBundleComponentsAsList(firstPageReferralBundle, Optional.empty(), fhirClient, fisProperties);

        return retreivedReferrals.stream().parallel()
                .filter(retreivedBundle -> retreivedBundle.getResource().getResourceType().equals(ResourceType.ServiceRequest))
                .map(retreivedReferral -> {
                    ServiceRequest serviceRequest = (ServiceRequest) retreivedReferral.getResource();
                    ServiceRequestDto serviceRequestDto = ServiceRequestToServiceRequestDtoMap.map(serviceRequest);
                    setRollupNumbers(serviceRequest);
                    return serviceRequestDto;
                }).collect(toList());
    }

    @Override
    public List<ServiceRequestDto> getServiceRequest(Optional<String> patient) {
        IQuery subject = getReferralsIQuery(patient);
        List<ServiceRequestDto> serviceRequestDtoList = getServiceRequestDtos(subject);
        return serviceRequestDtoList;
    }
}
