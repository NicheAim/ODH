package gov.samhsa.ocp.ocpedgeserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class OcpEdgeServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(OcpEdgeServerApplication.class, args);
    }
}
