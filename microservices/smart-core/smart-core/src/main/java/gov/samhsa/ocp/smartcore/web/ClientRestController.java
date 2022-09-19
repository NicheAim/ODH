package gov.samhsa.ocp.smartcore.web;

import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientMetaDto;
import gov.samhsa.ocp.smartcore.service.ClientService;
import gov.samhsa.ocp.smartcore.service.dto.ClientDetailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


import java.util.List;

@RestController
public class ClientRestController {
    @Autowired
    private ClientService clientService;

    @PostMapping("/clients")
    public void createClient(@Valid @RequestBody ClientDetailDto clientDto) {
        clientService.createClient(clientDto);
    }

    @GetMapping("/clients/meta")
    public List<ClientMetaDto> getClients() {
        return clientService.getAllClientMeta();
    }

    @GetMapping("/clients")
    public List<ClientDetailDto> getClientDetails() {
        return clientService.getAllClients();
    }

    @DeleteMapping("/clients/{clientId}")
    public void deleteClient(@PathVariable("clientId") String clientId) {
        clientService.deleteClient(clientId);
    }

    @PutMapping("/clients/{clientId}")
    public void updateClient(@PathVariable("clientId") String clientId, @Valid @RequestBody ClientDetailDto clientDto) {
        clientService.updateClient(clientId, clientDto);
    }

}
