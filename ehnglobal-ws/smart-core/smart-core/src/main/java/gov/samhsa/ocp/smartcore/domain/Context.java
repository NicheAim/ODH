package gov.samhsa.ocp.smartcore.domain;

public enum Context {

    user, organization, location, patient, encounter, resource;

    public static final String LAUNCH_SCOPE_PREFIX = "launch/";
    public static final String EMPTY_STRING = "";

    public static Context fromLaunchScope(String launchScope) {
        return Context.valueOf(launchScope.replaceFirst(LAUNCH_SCOPE_PREFIX, EMPTY_STRING));
    }

    public String getLaunchScope() {
        return new StringBuilder().append(LAUNCH_SCOPE_PREFIX).append(this.name()).toString();
    }
}
