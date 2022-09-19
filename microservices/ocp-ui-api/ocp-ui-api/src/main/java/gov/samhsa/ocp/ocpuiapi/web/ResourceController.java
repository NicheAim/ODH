package gov.samhsa.ocp.ocpuiapi.web;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ocp-fis")
@Slf4j
public class ResourceController {
    @Autowired
    FisClient fisClient;

    @DeleteMapping("/delete/{resource}/{id}")
    public void delete(@PathVariable String resource, @PathVariable String id){
        fisClient.delete(resource,id);
    }
}
