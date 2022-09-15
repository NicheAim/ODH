package gov.samhsa.ocp.smartcore.service;

import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientMetaDto;
import gov.samhsa.ocp.smartcore.service.dto.ClientDetailDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ClientService {
    @Transactional(readOnly = true)
    List<ClientMetaDto> getAllClientMeta();

    @Transactional(readOnly = true)
    List<ClientDetailDto> getAllClients();

    @Transactional
    void createClient(ClientDetailDto clientDto);

    @Transactional
    void deleteClient(String clientId);

    @Transactional
    void updateClient(String clientId, ClientDetailDto clientDto);
}
