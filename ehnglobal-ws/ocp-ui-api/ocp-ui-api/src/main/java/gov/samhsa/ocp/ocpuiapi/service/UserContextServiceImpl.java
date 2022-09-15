package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.dto.JwtTokenKey;
import gov.samhsa.ocp.ocpuiapi.service.dto.OrganizationDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.UserContextDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserContextServiceImpl implements UserContextService{

    public static final String OMNIBUS_CARE_PLAN_SAMSHA = "Omnibus Care Plan (SAMSHA)";

    private final FisClient fisClient;

    private final JwtTokenExtractor jwtTokenExtractor;

    @Autowired
    public UserContextServiceImpl(FisClient fisClient, JwtTokenExtractor jwtTokenExtractor) {
        this.fisClient = fisClient;
        this.jwtTokenExtractor = jwtTokenExtractor;
    }

    enum UserType {
        PRACTITIONER, PATIENT, OCPADMIN
    }

    @Override
    public String getUserOrganizationId() {
        Map extAttr = (Map) jwtTokenExtractor.getValueByKey(JwtTokenKey.EXT_ATTR);
        return extAttr.get("orgId").toString();
    }

    @Override
    public UserType getUserResourceType() {
        Map extAttr = (Map) jwtTokenExtractor.getValueByKey(JwtTokenKey.EXT_ATTR);

        if(!extAttr.isEmpty()){
            String extAttrValue = extAttr.get("resource").toString();

            if(extAttrValue.equalsIgnoreCase("Practitioner"))
                return UserType.PRACTITIONER;

            if(extAttrValue.equalsIgnoreCase("Patient"))
                return UserType.PATIENT;

            if(extAttrValue.equalsIgnoreCase("ocpAdmin"))
                return UserType.OCPADMIN;
        }
        return null;
    }

    @Override
    public String getUserResourceId() {
        Map extAttr = (Map) jwtTokenExtractor.getValueByKey(JwtTokenKey.EXT_ATTR);
        return extAttr.get("id").toString();
    }

    @Override
    public UserContextDto getUserContext() {
        Object fhirResource = null;
        UserType resourceType = getUserResourceType();
        if(resourceType.equals(UserType.PRACTITIONER)){
            fhirResource = fisClient.getPractitioner(getUserResourceId());
        }
        if(resourceType.equals(UserType.PATIENT)){
            fhirResource = fisClient.getPatientById(getUserResourceId());
        }
        OrganizationDto organization = fisClient.getOrganization(getUserOrganizationId());
        return UserContextDto.builder().organization(organization).fhirResource(fhirResource).build();
    }

    @Override
    public String getUserFhirId() {
        String fhirId = "";
        UserType resourceType = getUserResourceType();

        if(resourceType.equals(UserType.OCPADMIN)) {
            //this organization must exist as part of application setup
            // TODO: resourceType is null for ocpAdmin.Fix it
            PageDto<OrganizationDto> organizations = fisClient.searchOrganizations("name", OMNIBUS_CARE_PLAN_SAMSHA, true, 1, 1, true);
            fhirId = "Organization/" + organizations.getElements().stream().findFirst().get().getLogicalId();
        } else if(resourceType.equals(UserType.PRACTITIONER)){
            fhirId = "Practitioner/" + getUserResourceId();
        }else if(resourceType.equals(UserType.PATIENT)) {
            fhirId = "Patient/" + getUserResourceId();
        }

        return fhirId;
    }
}
