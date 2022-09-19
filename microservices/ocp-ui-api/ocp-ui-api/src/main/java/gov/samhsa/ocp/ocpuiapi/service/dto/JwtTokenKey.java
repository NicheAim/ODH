package gov.samhsa.ocp.ocpuiapi.service.dto;

public enum JwtTokenKey {
    JTI("jti"),
    SUB("sub"),
    SCOPE("acl"), // before: scope
    CLIENT_ID("azp"), // before: client_id
    GRANT_TYPE("grant_type"),
    USER_ID("sub"), // before: user_id
    ORIGIN("azp"), // before: origin
    USER_NAME("preferred_username"), // before: user_name
    EMAIL("email"),
    AUTH_TIME("iat"), // before: auth_time
    EXT_ATTR("ext_attr"),
    EXP("exp");

    private final String name;

    JwtTokenKey(String s) {
        name = s;
    }

    public String toString() {
        return this.name;
    }
}
