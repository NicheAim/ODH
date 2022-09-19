package gov.samhsa.ocp.smartgateway.config;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
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
                        .antMatchers(HttpMethod.GET, "/authorize").permitAll()
                        .antMatchers(HttpMethod.GET, "/launcher").permitAll()
                        .antMatchers(HttpMethod.OPTIONS, "/token").permitAll()
                        .antMatchers(HttpMethod.POST, "/token").permitAll()
                        .antMatchers(HttpMethod.GET, "/launch").permitAll()
                        .antMatchers(HttpMethod.GET, "/clients/meta").permitAll()
                        .antMatchers(HttpMethod.GET, "/clients").permitAll()
                        .antMatchers(HttpMethod.POST, "/clients").permitAll()
                        .antMatchers(HttpMethod.PUT, "/clients/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/clients/**").permitAll();
            }
        };
    }
}
