package gov.samhsa.ocp.ocpuiapi.web;


import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ocp-fis/episode-of-cares")
public class EpisodeOfCareController {

    private final FisClient fisClient;

    @Autowired
    public EpisodeOfCareController(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @GetMapping
    private List<ReferenceDto> getEpisodeOfCares(@RequestParam(value = "patient") String patient,
                                                 @RequestParam(value = "organization", required = false) String organization,
                                                 @RequestParam(value = "status", required = false) String status) {
        try {
            return fisClient.getEpisodeOfCares(patient, organization, status);
        } catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no EpisodeOfCare was found for the given patient Id");
            return null;
        }
    }
}
