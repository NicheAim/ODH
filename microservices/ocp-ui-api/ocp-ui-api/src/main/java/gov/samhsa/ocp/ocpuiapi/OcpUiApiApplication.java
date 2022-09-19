package gov.samhsa.ocp.ocpuiapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
@EnableResourceServer
public class OcpUiApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(OcpUiApiApplication.class, args);
    }
}
