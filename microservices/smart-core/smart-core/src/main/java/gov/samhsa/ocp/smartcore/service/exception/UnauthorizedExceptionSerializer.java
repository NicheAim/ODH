package gov.samhsa.ocp.smartcore.service.exception;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

import static gov.samhsa.ocp.smartcore.config.Constants.ERROR;
import static gov.samhsa.ocp.smartcore.config.Constants.ERROR_DESCRIPTION;

public class UnauthorizedExceptionSerializer extends JsonSerializer<UnauthorizedException> {

    @Override
    public void serialize(UnauthorizedException e, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField(ERROR, e.getError());
        jsonGenerator.writeStringField(ERROR_DESCRIPTION, e.getErrorDescription());
        jsonGenerator.writeEndObject();
    }
}
