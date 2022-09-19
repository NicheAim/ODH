package gov.samhsa.ocp.smartcore.web;

import gov.samhsa.ocp.smartcore.service.LaunchService;
import gov.samhsa.ocp.smartcore.service.dto.LaunchRequestDto;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/launch")
public class LaunchRestController {
    @Autowired
    private LaunchService launchService;

    @GetMapping("/{launchId}")
    public LaunchResponseDto get(@PathVariable("launchId") String launchId, @RequestParam("user") Optional<String> user) {
        return launchService.get(launchId, user);
    }

    @PostMapping()
    public LaunchResponseDto create(@Valid @RequestBody LaunchRequestDto launchRequest) {
        return launchService.create(launchRequest);
    }

    @PostMapping("/{launchId}")
    public LaunchResponseDto mergeAndSave(@PathVariable("launchId") String launchId,
                                          @Valid @RequestBody LaunchRequestDto launchRequest) {
        return launchService.mergeAndSave(launchId, launchRequest);
    }

    @PutMapping("/{launchId}")
    public LaunchResponseDto overrideAndSave(@PathVariable("launchId") String launchId,
                                             @Valid @RequestBody LaunchRequestDto launchRequest) {
        return launchService.overrideAndSave(launchId, launchRequest);
    }

    @DeleteMapping("/{launchId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("launchId") String launchId, @RequestParam("user") Optional<String> user) {
        launchService.delete(launchId, user);
    }
}
