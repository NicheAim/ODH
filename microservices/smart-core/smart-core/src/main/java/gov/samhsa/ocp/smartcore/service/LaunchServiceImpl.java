package gov.samhsa.ocp.smartcore.service;

import gov.samhsa.ocp.smartcore.domain.Launch;
import gov.samhsa.ocp.smartcore.domain.LaunchRepository;
import gov.samhsa.ocp.smartcore.service.dto.LaunchRequestDto;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import gov.samhsa.ocp.smartcore.service.exception.InvalidOrExpiredLaunchIdException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class LaunchServiceImpl implements LaunchService {

    @Autowired
    private LaunchRepository launchRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public LaunchResponseDto create(LaunchRequestDto launchRequest) {
        final Launch launch = Launch.builder()
                .user(launchRequest.getUser())
                .patient(launchRequest.getPatient())
                .organization(launchRequest.getOrganization())
                .location(launchRequest.getLocation())
                .encounter(launchRequest.getEncounter())
                .resource(launchRequest.getResource())
                .intent(launchRequest.getIntent())
                .needPatientBanner(launchRequest.getNeedPatientBanner())
                .build();
        final Launch savedLaunch = launchRepository.save(launch);
        final LaunchResponseDto launchResponse = modelMapper.map(savedLaunch, LaunchResponseDto.class);
        return launchResponse;
    }

    @Override
    @Transactional
    public LaunchResponseDto mergeAndSave(String launchId, LaunchRequestDto launchRequest) {
        final Launch launch = launchRepository.findById(launchId).orElseThrow(InvalidOrExpiredLaunchIdException::new);
        if (StringUtils.hasText(launchRequest.getUser())) {
            System.out.println("LAUNCH USER: "+launchRequest.getUser());
            launch.setUser(launchRequest.getUser());
        }
        if (StringUtils.hasText(launchRequest.getOrganization())) {
            System.out.println("LAUNCH ORG: "+ launchRequest.getOrganization());
            launch.setOrganization(launchRequest.getOrganization());
        }
        if (StringUtils.hasText(launchRequest.getLocation())) {
            System.out.println("LAUNCH LOCATION: "+ launchRequest.getLocation());
            launch.setLocation(launchRequest.getLocation());
        }
        if (StringUtils.hasText(launchRequest.getPatient())) {
            System.out.println("LAUNCH PATIENT: "+ launchRequest.getPatient());
            launch.setPatient(launchRequest.getPatient());
        }
        if (StringUtils.hasText(launchRequest.getEncounter())) {
            System.out.println("LAUNCH ENCOUNTER: "+ launchRequest.getEncounter());
            launch.setEncounter(launchRequest.getEncounter());
        }
        if (StringUtils.hasText(launchRequest.getResource())) {
            System.out.println("LAUNCH RESOURCE: "+ launchRequest.getResource());
            launch.setResource(launchRequest.getResource());
        }
        final Launch savedLaunch = launchRepository.save(launch);
        final LaunchResponseDto launchResponse = modelMapper.map(savedLaunch, LaunchResponseDto.class);
        return launchResponse;
    }

    @Override
    @Transactional
    public LaunchResponseDto overrideAndSave(String launchId, LaunchRequestDto launchRequest) {
        final Launch launch = launchRepository.findById(launchId).orElseThrow(InvalidOrExpiredLaunchIdException::new);
        modelMapper.map(launchRequest, launch);
        final Launch savedLaunch = launchRepository.save(launch);
        final LaunchResponseDto launchResponse = modelMapper.map(savedLaunch, LaunchResponseDto.class);
        return launchResponse;
    }

    @Override
    @Transactional(readOnly = true)
    public LaunchResponseDto get(String launchId, Optional<String> user) {
        final Launch launch = user.isPresent() ?
                launchRepository
                        .findByIdAndUser(launchId, user.get())
                        .orElseThrow(InvalidOrExpiredLaunchIdException::new) :
                launchRepository
                        .findById(launchId)
                        .orElseThrow(InvalidOrExpiredLaunchIdException::new);
        final LaunchResponseDto launchResponse = modelMapper.map(launch, LaunchResponseDto.class);
        return launchResponse;
    }

    @Override
    @Transactional
    public void delete(String launchId, Optional<String> user) {
        launchRepository.delete(launchId);
    }
}
