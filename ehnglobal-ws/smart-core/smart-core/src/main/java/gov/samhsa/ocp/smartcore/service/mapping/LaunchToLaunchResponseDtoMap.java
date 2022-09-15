package gov.samhsa.ocp.smartcore.service.mapping;

import gov.samhsa.ocp.smartcore.domain.Launch;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

@Component
public class LaunchToLaunchResponseDtoMap extends PropertyMap<Launch, LaunchResponseDto> {
    @Override
    protected void configure() {
        map().setLaunch(source.getId());
    }
}
