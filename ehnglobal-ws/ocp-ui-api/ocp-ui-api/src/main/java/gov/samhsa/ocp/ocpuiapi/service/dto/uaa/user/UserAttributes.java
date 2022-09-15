package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class UserAttributes {

    @JsonProperty("resource")
    private List<String> resource = null;

    @JsonProperty("id")
    private List<String> id = null;

    @JsonProperty("orgId")
    private List<String> orgId = null;

    public List<String> getResource() {
        return resource;
    }

    public void setResource(List<String> resource) {
        this.resource = resource;
    }

    public List<String> getId() {
        return id;
    }

    public void setId(List<String> id) {
        this.id = id;
    }

    public List<String> getOrgId() {
        return orgId;
    }

    public void setOrgId(List<String> orgId) {
        this.orgId = orgId;
    }

}
