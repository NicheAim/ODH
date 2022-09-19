package gov.samhsa.ocp.ocpuiapi.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoDocumentsFoundException extends RuntimeException {
    public NoDocumentsFoundException() {
        super();
    }

    public NoDocumentsFoundException(String message) {
        super(message);
    }

    public NoDocumentsFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoDocumentsFoundException(Throwable cause) {
        super(cause);
    }

    protected NoDocumentsFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
