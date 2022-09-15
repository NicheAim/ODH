package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.MetaDataService;
import org.hl7.fhir.r4.model.Meta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fhir")
public class MetadataController {

    @Autowired
    public MetaDataService metaDataService;

    @GetMapping(value = "/metadata", produces = "application/json" )
    public String getMetadata(){
        return metaDataService.getMetadata();
    }
}