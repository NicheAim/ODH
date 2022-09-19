package gov.samhsa.ocp.ocpfis.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class EpisodeOfCareNotFoundException extends RuntimeException {
    public EpisodeOfCareNotFoundException() {
        super();
    }

    public EpisodeOfCareNotFoundException(String message) {
        super(message);
    }
}