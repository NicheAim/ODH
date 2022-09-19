package gov.samhsa.ocp.ocpuiapi.service.dto.uaa.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Info {

    @JsonProperty("roles")
    private Object roles;

    @JsonProperty("user_attributes")
    private UserAttributes userAttributes;

    public Object getRoles() {
        return roles;
    }

    public void setRoles(Object roles) {
        this.roles = roles;
    }

    public UserAttributes getUserAttributes() {
        return userAttributes;
    }

    public void setUserAttributes(UserAttributes userAttributes) {
        this.userAttributes = userAttributes;
    }

}
