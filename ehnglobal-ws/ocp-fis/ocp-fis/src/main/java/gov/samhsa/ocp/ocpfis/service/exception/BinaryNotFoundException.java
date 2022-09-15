package gov.samhsa.ocp.ocpfis.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class BinaryNotFoundException extends RuntimeException {
    public BinaryNotFoundException(){super();}

    public BinaryNotFoundException(String message) {
        super(message);
    }
}
