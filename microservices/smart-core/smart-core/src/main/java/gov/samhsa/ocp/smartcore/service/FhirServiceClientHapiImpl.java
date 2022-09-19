package gov.samhsa.ocp.smartcore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IClientInterceptor;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;

@Component("FhirServiceClientHapiImpl")
public class FhirServiceClientHapiImpl implements FhirServiceClient {
    private SmartCoreProperties smartCoreProperties;
    private IClientInterceptor clientInterceptor;

    @Autowired
    public FhirServiceClientHapiImpl(
            SmartCoreProperties smartCoreProperties,
            @Qualifier("ClientInterceptorHapiImpl") IClientInterceptor clientInterceptor) {
        this.smartCoreProperties = smartCoreProperties;
        this.clientInterceptor = clientInterceptor;
    }

    @Override
    @Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
    public IGenericClient getClient(FhirContext fhirContext) {
        fhirContext.getRestfulClientFactory()
                .setSocketTimeout(Integer.parseInt(smartCoreProperties.getClient_socket_timeout_in_ms()));
        IGenericClient proxyClientGeneric = fhirContext
                .newRestfulGenericClient(smartCoreProperties.getFhir());
        proxyClientGeneric.registerInterceptor(clientInterceptor);
        return proxyClientGeneric;
    }
}