package gov.samhsa.ocp.smartcore.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class ClientInterfaceException extends RuntimeException {
    public ClientInterfaceException() {
        super();
    }

    public ClientInterfaceException(String message) {
        super(message);
    }
}
