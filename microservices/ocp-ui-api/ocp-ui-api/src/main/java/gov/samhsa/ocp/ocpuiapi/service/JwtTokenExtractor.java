package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.service.dto.JwtTokenKey;

public interface  JwtTokenExtractor {
        Object getValueByKey(JwtTokenKey key);
}
