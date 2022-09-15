package gov.samhsa.ocp.ocpuiapi.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class OauthClientConfigMissingException extends RuntimeException {
    public OauthClientConfigMissingException() {
        super();
    }

    public OauthClientConfigMissingException(String message) {
        super(message);
    }

    public OauthClientConfigMissingException(String message, Throwable cause) {
        super(message, cause);
    }

    public OauthClientConfigMissingException(Throwable cause) {
        super(cause);
    }

    protected OauthClientConfigMissingException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
