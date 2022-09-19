package gov.samhsa.ocp.ocpuiapi.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UserAuthenticationFailure extends RuntimeException {
    public UserAuthenticationFailure() {
        super();
    }

    public UserAuthenticationFailure(String message) {
        super(message);
    }

    public UserAuthenticationFailure(String message, Throwable cause) {
        super(message, cause);
    }

    public UserAuthenticationFailure(Throwable cause) {
        super(cause);
    }

    protected UserAuthenticationFailure(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
