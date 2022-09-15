package gov.samhsa.ocp.smartcore.infrastructure;

import gov.samhsa.ocp.smartcore.config.OAuth2FeignClientCredentialsConfig;
import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientDto;
import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientMetaDto;
import gov.samhsa.ocp.smartcore.infrastructure.dto.ListClientDto;
import gov.samhsa.ocp.smartcore.service.dto.ClientDetailDto;
import gov.samhsa.ocp.smartcore.service.dto.KeycloakClientDto;
import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.AllClientsDto;
import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.RetrieveClientDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "oauth2ClientRestClient", url = "${smart-core.oauth2}", configuration = OAuth2FeignClientCredentialsConfig.class)
public interface OAuth2ClientRestClient {

    @RequestMapping(value = "/clients", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    List<ClientMetaDto> getAllClientMeta();

    @RequestMapping(value = "/clients", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    List<AllClientsDto> getAllClients();

    @RequestMapping(value = "/clients/{clientId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ClientMetaDto getClientMeta(@PathVariable("clientId") String clientId);

    @RequestMapping(value = "/clients", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    KeycloakClientDto createClient(KeycloakClientDto clientDto);

    @RequestMapping(value = "/clients/{clientId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    KeycloakClientDto updateClient(@PathVariable("clientId") String clientId, KeycloakClientDto clientDto);

    @RequestMapping(value = "/clients/{clientId}/meta", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ClientMetaDto createClientMeta(@PathVariable("clientId") String clientId, ClientMetaDto clientMetaDto);

    @RequestMapping(value = "/clients", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    List<RetrieveClientDto> getIDClient(@RequestParam(name = "clientId") String clientId);

    @RequestMapping(value = "/clients/{clientId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ClientMetaDto deleteClient(@PathVariable("clientId") String clientId);
}
