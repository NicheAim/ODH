package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ocp-fis/fhir")
public class MetaDataController {
    private final FisClient fisClient;

    public MetaDataController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @GetMapping(value = "/metadata", produces = "application/json")
    String getMetaData() {
        return fisClient.getMetadata();
    }

}
