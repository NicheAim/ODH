package gov.samhsa.ocp.ocpuiapi.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class AuthClientException extends RuntimeException {
  public AuthClientException() {
    super();
  }

  public AuthClientException(String message) {
    super(message);
  }
}
