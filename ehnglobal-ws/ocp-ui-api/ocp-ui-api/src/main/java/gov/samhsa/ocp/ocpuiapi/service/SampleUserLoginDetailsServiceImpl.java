package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.config.SampleFileProperties;
import gov.samhsa.ocp.ocpuiapi.service.dto.SampleUserLoginDetailsDto;
import gov.samhsa.ocp.ocpuiapi.service.exception.NoDocumentsFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
@Slf4j
public class SampleUserLoginDetailsServiceImpl implements SampleUserLoginDetailsService {

    private static final String SAMPLE_DOCUMENTS_FOLDER = "sampledocs/";

    @Autowired
    SampleFileProperties sampleFileProperties;

    @Override
    public SampleUserLoginDetailsDto getSampleUserLoginDetails() {
        SampleUserLoginDetailsDto sampleUserLoginDetailsDto = new SampleUserLoginDetailsDto();
        String sampleFilePath = SAMPLE_DOCUMENTS_FOLDER.concat(sampleFileProperties.getSampleFileForLoginDetails().getFileName());
        ClassPathResource classPathResource = new ClassPathResource(sampleFilePath);
        try (InputStream sampleFileInputStream = classPathResource.getInputStream()) {
            byte[] sampleFileBytes = IOUtils.toByteArray(sampleFileInputStream);
            String encodedBase64 = new String(Base64.encodeBase64(sampleFileBytes));
            sampleUserLoginDetailsDto.setEncodedPdf(encodedBase64);
            return sampleUserLoginDetailsDto;
        } catch (IOException e) {
            log.error("Unable to get sample file: " + sampleFilePath);
            log.debug(e.getMessage(), e);
            throw new NoDocumentsFoundException("Unable to get sample file for login details");
        }
    }
}
