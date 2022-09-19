package gov.samhsa.ocp.smartcore.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidOrExpiredLaunchIdException extends RuntimeException {
    public InvalidOrExpiredLaunchIdException() {
    }

    public InvalidOrExpiredLaunchIdException(String message) {
        super(message);
    }

    public InvalidOrExpiredLaunchIdException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidOrExpiredLaunchIdException(Throwable cause) {
        super(cause);
    }

    public InvalidOrExpiredLaunchIdException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
