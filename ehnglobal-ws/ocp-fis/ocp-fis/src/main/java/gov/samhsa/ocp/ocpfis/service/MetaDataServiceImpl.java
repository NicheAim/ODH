package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IFetchConformanceUntyped;
import com.google.gson.*;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import org.hl7.fhir.r4.model.CapabilityStatement;
import org.hl7.fhir.r4.model.Meta;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class MetaDataServiceImpl implements MetaDataService{

    private final IGenericClient client;
    private final FisProperties fisProperties;

    public MetaDataServiceImpl(IGenericClient client, FisProperties fisProperties) {
        this.client = client;
        this.fisProperties = fisProperties;
    }

    @Override
    public String getMetadata() {
        CapabilityStatement capabilityStatement = client.capabilities().ofType(CapabilityStatement.class).execute();
        FhirContext fhirContextinternal = FhirContext.forR4();

        fhirContextinternal.getRestfulClientFactory()
                .setSocketTimeout(Integer.parseInt(fisProperties.getFhir().getClientSocketTimeoutInMs()));
        String capabilities = fhirContextinternal.newJsonParser().encodeResourceToString(capabilityStatement);

        JsonElement jsonElement = JsonParser.parseString(capabilities);

        JsonObject authorize =  new JsonObject();
        authorize.addProperty("url","authorize");
        authorize.addProperty("valueUri","https://example-url.com/smart/authorize");

        JsonObject token = new JsonObject();
        token.addProperty("url","token");
        token.addProperty("valueUri","https://example-url.com/smart/token");

        JsonObject register = new JsonObject();
        register.addProperty("url","register");
        register.addProperty("valueUri","https://example-url.com/smart/register");

        JsonArray inner_extension = new JsonArray();
        inner_extension.add(register);
        inner_extension.add(authorize);
        inner_extension.add(token);

        JsonObject extension_url = new JsonObject();
        extension_url.addProperty("url","http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris");
        extension_url.add("extension", inner_extension);

        JsonArray outer_extensions = new JsonArray();
        outer_extensions.add(extension_url);

        JsonObject coding = new JsonObject();
        coding.addProperty("system","http://hl7.org/fhir/restful-security-service");
        coding.addProperty("code","SMART-on-FHIR");
        coding.addProperty("display","SMART-on-FHIR");

        JsonArray security_coding = new JsonArray();
        security_coding.add(coding);

        JsonObject inner_coding = new JsonObject();
        inner_coding.add("coding", security_coding);

        JsonArray codings = new JsonArray();
        codings.add(inner_coding);

        JsonArray service_coding = new JsonArray();
        service_coding.add(codings);

        JsonObject security_inner = new JsonObject();
        security_inner.add("extension", outer_extensions);
        security_inner.add("service", service_coding);

        JsonObject security = new JsonObject();
        security.add("security", security_inner);

        JsonObject jsonObject = jsonElement.getAsJsonObject();
        jsonObject.get("rest").getAsJsonArray().get(0).getAsJsonObject().add("security", security_inner);

        Gson gson_rest = new GsonBuilder().setPrettyPrinting().create();

        return gson_rest.toJson(jsonObject);
    }
}
