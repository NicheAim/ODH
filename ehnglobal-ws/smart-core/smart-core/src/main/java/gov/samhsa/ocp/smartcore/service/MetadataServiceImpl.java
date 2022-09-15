package gov.samhsa.ocp.smartcore.service;

import org.hl7.fhir.r4.model.CapabilityStatement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

import ca.uhn.fhir.parser.IParser;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.smartcore.config.SmartCoreProperties;

@Service
public class MetadataServiceImpl implements MetadataService {

    private SmartCoreProperties smartCoreProperties;
    private IGenericClient client;
    private IParser iParser;

    @Autowired
    public MetadataServiceImpl(SmartCoreProperties smartCoreProperties, IGenericClient client, IParser iParser) {
        this.smartCoreProperties = smartCoreProperties;
        this.client = client;
        this.iParser = iParser;
    }

    public String getMetadata() {
        CapabilityStatement capabilityStatement = client.capabilities().ofType(CapabilityStatement.class).execute();
        String capabilities = iParser.encodeResourceToString(capabilityStatement);

        JsonElement jsonElement = null;

        try {
            jsonElement = JsonParser.parseString(capabilities);
        } catch (JsonSyntaxException e) {
            e.printStackTrace();
        }

        JsonObject authorize = new JsonObject();
        authorize.addProperty("url", "authorize");
        authorize.addProperty("valueUri", smartCoreProperties.getServerHost() + "/authorize");

        JsonObject token = new JsonObject();
        token.addProperty("url", "token");
        token.addProperty("valueUri", smartCoreProperties.getServerHost() + "/token");

        JsonObject register = new JsonObject();
        register.addProperty("url", "register");
        register.addProperty("valueUri", smartCoreProperties.getServerHost() + "/register");

        JsonArray inner_extension = new JsonArray();
        inner_extension.add(register);
        inner_extension.add(authorize);
        inner_extension.add(token);

        JsonObject extension_url = new JsonObject();
        extension_url.addProperty("url", "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris");
        extension_url.add("extension", inner_extension);

        JsonArray outer_extensions = new JsonArray();
        outer_extensions.add(extension_url);

        JsonObject coding = new JsonObject();
        coding.addProperty("system", "http://hl7.org/fhir/restful-security-service");
        coding.addProperty("code", "SMART-on-FHIR");
        coding.addProperty("display", "SMART-on-FHIR");

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
    };
}
