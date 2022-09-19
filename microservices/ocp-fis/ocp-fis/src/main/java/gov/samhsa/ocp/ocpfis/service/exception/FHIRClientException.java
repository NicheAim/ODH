package gov.samhsa.ocp.ocpfis.service.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class FHIRClientException  extends RuntimeException {
    public FHIRClientException() {
        super();
    }
    public FHIRClientException(String message) {
        super(message);
        log.error(message);
    }
}
