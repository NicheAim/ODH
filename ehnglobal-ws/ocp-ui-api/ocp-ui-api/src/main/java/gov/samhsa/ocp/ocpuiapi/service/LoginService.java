package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.CredentialDto;

public interface LoginService {
    Object login(CredentialDto credentialDto);
}
