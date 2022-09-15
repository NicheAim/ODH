package gov.samhsa.ocp.ocpuiapi.infrastructure;

import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.LaunchRequestDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.LaunchResponseDto;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@FeignClient(name = "smart-core", url = "${smart.core-url}")
public interface SmartCoreClient {

    @RequestMapping(value = "/launch", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    LaunchResponseDto create(@Valid @RequestBody LaunchRequestDto launchRequest);

    @RequestMapping(value = "/launch/{launchId}", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    LaunchResponseDto mergeAndSave(@PathVariable("launchId") String launchId,
                                   @Valid @RequestBody LaunchRequestDto launchRequest);
}
