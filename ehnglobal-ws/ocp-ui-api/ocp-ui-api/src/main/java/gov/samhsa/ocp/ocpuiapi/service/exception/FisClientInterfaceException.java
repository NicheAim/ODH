package gov.samhsa.ocp.ocpuiapi.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class FisClientInterfaceException extends RuntimeException {
    public FisClientInterfaceException() {
        super();
    }

    public FisClientInterfaceException(String message) {
        super(message);
    }
}
