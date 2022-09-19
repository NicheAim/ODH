package gov.samhsa.ocp.smartcore.service.client_interceptor;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ca.uhn.fhir.rest.client.api.IClientInterceptor;
import ca.uhn.fhir.rest.client.api.IHttpRequest;
import ca.uhn.fhir.rest.client.api.IHttpResponse;
import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("ClientInterceptorHapiImpl")
public class ClientInterceptorHapiImpl implements IClientInterceptor {
    private SmartCoreProperties smartCoreProperties;

    @Autowired
    public ClientInterceptorHapiImpl(
            SmartCoreProperties smartCoreProperties) {
        this.smartCoreProperties = smartCoreProperties;
    }

    @Override
    public void interceptRequest(IHttpRequest iHttpRequest) {
    }

    @Override
    public void interceptResponse(IHttpResponse theResponse) throws IOException {
    }
}
