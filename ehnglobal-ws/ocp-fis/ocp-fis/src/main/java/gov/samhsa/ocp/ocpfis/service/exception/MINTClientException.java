package gov.samhsa.ocp.ocpfis.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class MINTClientException extends RuntimeException {
    public MINTClientException() {
        super();
    }
    public MINTClientException(String message) {
        super(message);
    }
}
