package gov.samhsa.ocp.ocpedgeserver;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Ignore("Depends on config-server on bootstrap")
public class OcpEdgeServerApplicationTests {

	@Test
	public void contextLoads() {
	}

}
