package gov.samhsa.ocp.ocpuiapi.service;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.CredentialDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.OutlookCalendarDto;
import gov.samhsa.ocp.ocpuiapi.service.exception.UserAuthenticationFailure;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class OutlookCalendarServiceImpl implements OutlookCalendarService {
    private final FisClient fisClient;

    @Autowired
    public OutlookCalendarServiceImpl(FisClient fisClient) {
        this.fisClient = fisClient;
    }

    @Override
    public List<OutlookCalendarDto> getOutlookCalendarAppointments(String emailAddress, String password) {
        if (emailAddress == null || emailAddress.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            throw new UserAuthenticationFailure("Either Outlook Username or Password is NULL/EMPTY");
        }
        log.info("Searching for Outlook Appointments for email ID: " + emailAddress);
        try {
            return fisClient.getOutlookCalendarAppointments(emailAddress, password);
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that no for Outlook Appointments were found for email ID: " + emailAddress);
            return null;
        }
    }

    @Override
    public void loginToOutlook(CredentialDto credentialDto) {
        log.info("Logging in to OWA using username: " + credentialDto.getUsername());
        try {
            fisClient.loginToOutlook(credentialDto);
        }
        catch (FeignException fe) {
            ExceptionUtil.handleFeignException(fe, "that that entered username and password was not authorized.");
        }
    }
}
