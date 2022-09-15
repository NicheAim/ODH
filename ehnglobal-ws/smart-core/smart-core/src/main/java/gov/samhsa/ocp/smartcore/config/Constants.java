package gov.samhsa.ocp.smartcore.config;

public interface Constants {
    // OAuth2 - Get Authorization Code
    String CLIENT_ID = "client_id";
    String RESPONSE_TYPE = "response_type";
    String SCOPE = "scope";
    String REDIRECT_URI = "redirect_uri";
    String STATE = "state";
    String AUD = "aud";
    String GRANT_TYPE = "grant_type";
    String CODE = "code";
    String ERROR = "error";
    String ERROR_DESCRIPTION = "error_description";
    String CODE_CHALLENGE = "code_challenge";
    String CODE_CHALLENGE_METHOD = "code_challenge_method";

    // OAuth2 - Token Response
    String ACCESS_TOKEN = "access_token";
    String TOKEN_TYPE = "token_type";
    String REFRESH_TOKEN = "refresh_token";
    String ID_TOKEN = "id_token";
    String EXPIRES_IN = "expires_in";
    String EXT_ATTR = "ext_attr";
    // OAuth2+SMART - Token Response
    String NEED_PATIENT_BANNER = "need_patient_banner";
    String SMART_STYLE_URL = "smart_style_url";
    // SMART Launch
    String LAUNCH = "launch";
    String ISS = "iss";
    // OCP
    String REQUIRED_CONTEXT = "required_context";
    // Controllers
    String REDIRECT_PREFIX = "redirect:";
    String AUTHORIZATION_HEADER = "Authorization";
    String BASIC_AUTH_PREFIX = "Basic ";
    String AUTHORIZATION_PATH = "/authorize";
    String TOKEN_PATH = "/token";
    // Clients
    String AUTHORIZATION_CODE = "authorization_code";
    String CODE_VERIFIER = "code_verifier";
}
