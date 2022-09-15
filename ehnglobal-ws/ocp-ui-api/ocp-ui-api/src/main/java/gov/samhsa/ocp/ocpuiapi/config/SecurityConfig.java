package gov.samhsa.ocp.ocpuiapi.config;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
public class SecurityConfig {

    private static final String RESOURCE_ID = "ocpUiApi";

    @Bean
    public ResourceServerConfigurer resourceServer(SecurityProperties securityProperties) {
        return new ResourceServerConfigurerAdapter() {
            @Override
            public void configure(ResourceServerSecurityConfigurer resources) {
                resources.resourceId(RESOURCE_ID);
            }

            @Override
            public void configure(HttpSecurity http) throws Exception {
                if (securityProperties.isRequireSsl()) {
                    http.requiresChannel().anyRequest().requiresSecure();
                }
                http.authorizeRequests()
                        .antMatchers(HttpMethod.GET, "/receiver/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/testlogin").permitAll()
                        .antMatchers(HttpMethod.POST, "/refreshlogin").permitAll()
                        .antMatchers(HttpMethod.GET, "/ticket").permitAll()
                        .antMatchers(HttpMethod.POST, "/login/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/change-password").access("#oauth2.hasScopeMatching('password.write')")
                        .antMatchers(HttpMethod.GET, "/sample-user-login-details/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/lookups/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/user-context").access("#oauth2.hasScopeMatching('ocp.role.*')")

                        .antMatchers(HttpMethod.GET, "/ocp-fis/plandefinitions").permitAll()

                        .antMatchers(HttpMethod.POST, "/ocp-fis/organizations/*/activity-definitions/**").access("#oauth2.hasScopeMatching('ocpUiApi.activityDefinition_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/organizations/*/activity-definitions/**").access("#oauth2.hasScopeMatching('ocpUiApi.activityDefinition_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/activity-definitions/**").access("#oauth2.hasScopeMatching('ocpUiApi.activityDefinition_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/organizations/*/activity-definitions/**").access("#oauth2.hasScopeMatching('ocpUiApi.activityDefinition_update')")
                        //.antMatchers(HttpMethod.PUT, "/ocp-fis/activity-definitions/**").access("#oauth2.hasScopeMatching('ocpUiApi.activityDefinition_update')")
                        //.antMatchers(HttpMethod.DELETE, "/ocp-fis/activity-definitions/**").access("#oauth2.hasScopeMatching('ocpUiApi.activityDefinition_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/coverage/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/coverage/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/coverage/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/patients/*/subscriber-options/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/patients/*/coverages/**").permitAll()

                        .antMatchers(HttpMethod.POST, "/ocp-fis/appointments/**").access("#oauth2.hasScopeMatching('ocpUiApi.appointment_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/appointments/**").access("#oauth2.hasScopeMatching('ocpUiApi.appointment_read')")
                        .antMatchers(HttpMethod.POST, "/ocp-fis/outlook/login/**").access("#oauth2.hasScopeMatching('ocpUiApi.appointment_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/outlook/calendar/**").access("#oauth2.hasScopeMatching('ocpUiApi.appointment_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/appointments/**").access("#oauth2.hasScopeMatching('ocpUiApi.appointment_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/appointments/**").access("#oauth2.hasScopeMatching('ocpUiApi.appointment_delete')")

                        .antMatchers(HttpMethod.GET, "/ocp-fis/care-teams/participant-references/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/care-teams/**").access("#oauth2.hasScopeMatching('ocpUiApi.careTeam_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/care-teams/**").access("#oauth2.hasScopeMatching('ocpUiApi.careTeam_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/care-teams/**").access("#oauth2.hasScopeMatching('ocpUiApi.careTeam_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/care-teams/**").access("#oauth2.hasScopeMatching('ocpUiApi.careTeam_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/communications/**").access("#oauth2.hasScopeMatching('ocpUiApi.communication_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/communications/**").access("#oauth2.hasScopeMatching('ocpUiApi.communication_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/communications/**").access("#oauth2.hasScopeMatching('ocpUiApi.communication_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/communications/**").access("#oauth2.hasScopeMatching('ocpUiApi.communication_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/organization/*/healthcare-services/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/healthcare-services/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/organizations/*/healthcare-services/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/organizations/*/locations/*/healthcare-services/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/healthcare-services/*/assign").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_assign')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/healthcare-services/*/unassign").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_unassign')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/organization/*/healthcare-services/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_update')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/healthcare-services/*/inactive/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/healthcare-services/**").access("#oauth2.hasScopeMatching('ocpUiApi.healthcareService_delete')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/healthcare-service-references/**").permitAll()

                        .antMatchers(HttpMethod.GET, "/ocp-fis/location-references/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/organizations/*/locations/**").access("#oauth2.hasScopeMatching('ocpUiApi.location_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/locations/**").access("#oauth2.hasScopeMatching('ocpUiApi.location_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/organizations/*/locations/**").access("#oauth2.hasScopeMatching('ocpUiApi.location_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/organizations/*/locations/**").access("#oauth2.hasScopeMatching('ocpUiApi.location_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/locations/**").access("#oauth2.hasScopeMatching('ocpUiApi.location_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/organizations/**").access("#oauth2.hasScopeMatching('ocpUiApi.organization_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/organizations/**").access("#oauth2.hasScopeMatching('ocpUiApi.organization_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/organizations/**").access("#oauth2.hasScopeMatching('ocpUiApi.organization_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/organizations/**").access("#oauth2.hasScopeMatching('ocpUiApi.organization_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/patients/**").access("#oauth2.hasScopeMatching('ocpUiApi.patient_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/patients/**").access("#oauth2.hasScopeMatching('ocpUiApi.patient_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/Patient/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/patients/**").access("#oauth2.hasScopeMatching('ocpUiApi.patient_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/patients/**").access("#oauth2.hasScopeMatching('ocpUiApi.patient_delete')")

                        .antMatchers(HttpMethod.GET, "/ocp-fis/practitioners/practitioner-references/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/practitioners/**").access("#oauth2.hasScopeMatching('ocpUiApi.practitioner_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/practitioners/**").access("#oauth2.hasScopeMatching('ocpUiApi.practitioner_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/practitioners/**").access("#oauth2.hasScopeMatching('ocpUiApi.practitioner_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/practitioners/**").access("#oauth2.hasScopeMatching('ocpUiApi.practitioner_delete')")


                        .antMatchers(HttpMethod.POST, "/ocp-fis/relatedpersons/**").access("#oauth2.hasScopeMatching('ocpUiApi.relatedPerson_create')")
                        //.access("#oauth2.hasScopeMatching('ocpUiApi.relatedPerson_read')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/relatedpersons/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/relatedpersons/**").access("#oauth2.hasScopeMatching('ocpUiApi.relatedPerson_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/relatedpersons/**").access("#oauth2.hasScopeMatching('ocpUiApi.relatedPerson_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/tasks/**").access("#oauth2.hasScopeMatching('ocpUiApi.task_create')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/tasks/**").access("#oauth2.hasScopeMatching('ocpUiApi.task_read')")
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/tasks/**").access("#oauth2.hasScopeMatching('ocpUiApi.task_update')")
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/tasks/**").access("#oauth2.hasScopeMatching('ocpUiApi.task_delete')")

                        .antMatchers(HttpMethod.POST, "/ocp-fis/observations/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/observations/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/observations/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/ocp-fis/observations/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/observationpatient/**").permitAll()

                        .antMatchers(HttpMethod.GET, "/ocp-fis/attachments/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/attachments/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/careplans/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/careplans/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/goals/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/goals/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/goals/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/conditions/**").permitAll()
                        .antMatchers(HttpMethod.POST, "/ocp-fis/conditions/**").permitAll()
                        .antMatchers(HttpMethod.PUT, "/ocp-fis/conditions/**").permitAll()
                        //.antMatchers(HttpMethod.POST, "/ocp-fis/observations/**").access("#oauth2.hasScopeMatching('ocpUiApi.observation_create')")
                        //.antMatchers(HttpMethod.GET, "/ocp-fis/observations/**").access("#oauth2.hasScopeMatching('ocpUiApi.observation_read')")
                        //.antMatchers(HttpMethod.PUT, "/ocp-fis/observations/**").access("#oauth2.hasScopeMatching('ocpUiApi.observation_update')")
                        //.antMatchers(HttpMethod.DELETE, "/ocp-fis/observations/**").access("#oauth2.hasScopeMatching('ocpUiApi.observation_delete')")

                        //TODO: Secure Participant, EpisodeOfCare APIs
                        .antMatchers(HttpMethod.GET, "/ocp-fis/participants/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/ocp-fis/episode-of-cares/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/config").permitAll()
                        .antMatchers(HttpMethod.GET, "/user-context").access("#oauth2.hasScopeMatching('ocp.role.*')")
                        .antMatchers(HttpMethod.GET, "/smart/app-shortcuts").permitAll()
                        .antMatchers(HttpMethod.POST, "/smart/**").access("#oauth2.hasScopeMatching('ocp.role.smartUser')")


                        .antMatchers(HttpMethod.GET, "/groups").access("#oauth2.hasScopeMatching('ocpUiApi.group_read')")
                        .antMatchers(HttpMethod.GET, "/scopes").access("#oauth2.hasScopeMatching('ocpUiApi.group_read')")
                        .antMatchers(HttpMethod.POST, "/groups").access("#oauth2.hasScopeMatching('ocpUiApi.group_create')")
                        .antMatchers(HttpMethod.PUT, "/groups/**").access("#oauth2.hasScopeMatching('ocpUiApi.group_update')")

                        .antMatchers(HttpMethod.GET, "/manage-users").access("#oauth2.hasScopeMatching('ocpUiApi.user_read')")
                        .antMatchers(HttpMethod.GET, "/users").access("#oauth2.hasScopeMatching('ocpUiApi.user_read')")
                        .antMatchers(HttpMethod.POST, "/users").access("#oauth2.hasScopeMatching('ocpUiApi.user_create')")
                        .antMatchers(HttpMethod.PUT, "/users/**").access("#oauth2.hasScopeMatching('ocpUiApi.user_update')")
                        .antMatchers(HttpMethod.DELETE, "/users/**").access("#oauth2.hasScopeMatching('ocpUiApi.user_delete')")
                        .antMatchers(HttpMethod.GET, "/ocp-fis/fhir/**").permitAll()
                        .anyRequest().denyAll();
            }
        };
    }
}
