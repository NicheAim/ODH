package gov.samhsa.ocp.ocpdiscoveryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class OcpDiscoveryServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(OcpDiscoveryServerApplication.class, args);
    }
}
