package gov.samhsa.ocp.smartcore.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import gov.samhsa.ocp.smartcore.service.MetadataService;

@RestController
public class MetadataController {

    @Autowired
    private MetadataService metadataService;

    @GetMapping(value = "/metadata", produces = "application/json")
    public String getMetadata() {
        return metadataService.getMetadata();
    }
}
