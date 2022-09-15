package gov.samhsa.ocp.smartcore;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "smart-core")
public class Properties {
    private String oauth2;
    private String contextInitializer;
    private String oauth2Authorize;
    private String oauth2Token;
    private String fhir;
    private String jwt_iss;
    private String jwt_sub;
    private String jwt_secret;
    private String gcloudbucketname;
    private String gcloudbucketlocation;
    private String gcloudprojectid;

    public String getContextInitializer() {
        return contextInitializer;
    }

    public void setContextInitializer(String contextInitializer) {
        this.contextInitializer = contextInitializer;
    }

    public String getOauth2Authorize() {
        return oauth2Authorize;
    }

    public void setOauth2Authorize(String oauth2Authorize) {
        this.oauth2Authorize = oauth2Authorize;
    }

    public String getOauth2Token() {
        return oauth2Token;
    }

    public void setOauth2Token(String oauth2Token) {
        this.oauth2Token = oauth2Token;
    }

    public String getFhir() {
        return fhir;
    }

    public void setFhir(String fhir) {
        this.fhir = fhir;
    }

    public String getJwt_iss() {
        return jwt_iss;
    }

    public void setJwt_iss(String jwt_iss) {
        this.jwt_iss = jwt_iss;
    }

    public String getJwt_sub() {
        return jwt_sub;
    }

    public void setJwt_sub(String jwt_sub) {
        this.jwt_sub = jwt_sub;
    }

    public String getJwt_secret() {
        return jwt_secret;
    }

    public void setJwt_secret(String jwt_secret) {
        this.jwt_secret = jwt_secret;
    }

    public String getGcloudbucketname() {
        return gcloudbucketname;
    }

    public void setGcloudbucketname(String gcloudbucketname) {
        this.gcloudbucketname = gcloudbucketname;
    }

    public String getGcloudbucketlocation() {
        return gcloudbucketlocation;
    }

    public void setGcloudbucketlocation(String gcloudbucketlocation) {
        this.gcloudbucketlocation = gcloudbucketlocation;
    }

    public String getGcloudprojectid() {
        return gcloudprojectid;
    }

    public void setGcloudprojectid(String gcloudprojectid) {
        this.gcloudprojectid = gcloudprojectid;
    }

    public String getOauth2() {
        return oauth2;
    }

    public void setOauth2(String oauth2) {
        this.oauth2 = oauth2;
    }
}