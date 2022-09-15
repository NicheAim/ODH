package gov.samhsa.ocp.smartcore.service.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

@Data
@JsonSerialize(using = UnauthorizedExceptionSerializer.class)
public class UnauthorizedException extends RuntimeException {
    public static final String DEFAULT_ERROR = "unauthorized";
    public static final String DEFAULT_ERROR_DESCRIPTION = "Confidential apps must have Authorization, public apps must have client_id request parameter";
    private String error;
    private String errorDescription;

    public UnauthorizedException() {
        super(DEFAULT_ERROR + " : " + DEFAULT_ERROR_DESCRIPTION);
        this.error = DEFAULT_ERROR;
        this.errorDescription = DEFAULT_ERROR_DESCRIPTION;
    }

    public UnauthorizedException(String error, String errorDescription) {
        super(error + " : " + errorDescription);
        this.error = error;
        this.errorDescription = errorDescription;
    }
}
