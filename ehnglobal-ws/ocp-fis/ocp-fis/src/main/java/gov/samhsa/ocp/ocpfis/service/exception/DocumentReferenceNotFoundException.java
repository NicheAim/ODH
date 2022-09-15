package gov.samhsa.ocp.ocpfis.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class DocumentReferenceNotFoundException extends RuntimeException{
    public DocumentReferenceNotFoundException(){super();}

    public DocumentReferenceNotFoundException(String message) {
        super(message);
    }
}
