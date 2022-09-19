package gov.samhsa.ocp.smartcore.config;

import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;

import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Configuration
public class CorsConfig {

    public static final String ALLOWED_MAPPING = "/token";
    public static final String ALLOWED_MAPPING_METADATA = "/metadata";
    public static final String ALLOWED_ORIGINS = "*";
    public static final String[] ALLOWED_METHODS = {OPTIONS.name(), POST.name()};
    public static final String[] ALLOWED_METHODS_METADATA = {OPTIONS.name(), GET.name()};

    @PostConstruct
    public void afterPropertiesSet() {
        LoggerFactory.getLogger(CorsConfig.class).info("Enabling CORS configuration for 'mapping={}; origin={}; methods={}'", ALLOWED_MAPPING, ALLOWED_ORIGINS, ALLOWED_METHODS);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(ALLOWED_MAPPING)
                        .allowedOrigins(ALLOWED_ORIGINS)
                        .allowedMethods(ALLOWED_METHODS);

                registry.addMapping(ALLOWED_MAPPING_METADATA)
                        .allowedOrigins(ALLOWED_ORIGINS)
                        .allowedMethods(ALLOWED_METHODS_METADATA);
            }
        };
    }
}
