package gov.samhsa.ocp.smartcore.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateResourceFoundException extends RuntimeException {
    public DuplicateResourceFoundException() {
    }

    public DuplicateResourceFoundException(String message) {
        super(message);
    }
}
