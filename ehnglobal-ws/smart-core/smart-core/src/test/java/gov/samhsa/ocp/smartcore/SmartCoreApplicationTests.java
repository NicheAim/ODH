package gov.samhsa.ocp.smartcore;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import gov.samhsa.ocp.smartcore.domain.GrantType;
import gov.samhsa.ocp.smartcore.domain.ResponseType;
import gov.samhsa.ocp.smartcore.infrastructure.OAuth2ClientRestClient;
import gov.samhsa.ocp.smartcore.infrastructure.dto.ClientMetaDto;
import gov.samhsa.ocp.smartcore.infrastructure.dto.TokenResponseDto;
import gov.samhsa.ocp.smartcore.service.AuthorizationService;
import gov.samhsa.ocp.smartcore.service.ClientService;
import gov.samhsa.ocp.smartcore.service.LaunchService;
import gov.samhsa.ocp.smartcore.service.LauncherService;
import gov.samhsa.ocp.smartcore.service.TokenService;
import gov.samhsa.ocp.smartcore.service.dto.ClientDetailDto;
import gov.samhsa.ocp.smartcore.service.dto.ClientType;
import gov.samhsa.ocp.smartcore.service.dto.LaunchRequestDto;
import gov.samhsa.ocp.smartcore.service.dto.LaunchResponseDto;
import gov.samhsa.ocp.smartcore.service.dto.keycloakclient.RetrieveClientDto;
import gov.samhsa.ocp.smartcore.service.exception.InvalidOrExpiredLaunchIdException;

@RunWith(SpringRunner.class)
@SpringBootTest
@EnableConfigurationProperties(value = Properties.class)
@ActiveProfiles("test")
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
// @Ignore("Depends on config-server on bootstrap")
public class SmartCoreApplicationTests {
	private final String clientId = "unit_testcore";
	private final String[] create_redirecturis = { "http://localhost:3000" };
	private final String[] update_redirecturis = { "http://localhost:4000" };
	private final String[] defaultscopes = { "launch" };
	private final String launchurl = "http://localhost:3000";

	@Autowired
	ClientService clientService;

	@Autowired
	private LaunchService launchService;

	@Autowired
	private AuthorizationService authorizationService;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private LauncherService launcherService;

	@Autowired
	private OAuth2ClientRestClient oAuth2ClientRestClient;

	@Autowired
	Properties properties;

	@Test
	public void test01_property_jwt_secret() {
		// TODO: Find out how could we put test variables or test values against
		// application-test yml
		assertEquals("DiEV3neyR4KOUoy3XqppVx75vOxwbLyi",
				properties.getJwt_secret());
	}

	@Test
	public void test02_property_fhir() {
		assertEquals("https://dev-fhir-proxy-hbj57tqowq-uc.a.run.app/api/fhir-proxy",
				properties.getFhir());
	}

	@Test
	public void test03_properties_bucket() {
		assertEquals("zanenet-njinck-smartapps",
				properties.getGcloudbucketname());
		assertEquals("US",
				properties.getGcloudbucketlocation());
		assertEquals("zanenet-njinck",
				properties.getGcloudprojectid());
	}

	@Test
	public void test04_get_clients_metadata() {
		List<ClientMetaDto> clientMetaDtos = clientService.getAllClientMeta();
		assertTrue("Client List MetaData", clientMetaDtos.size() > 0);
	}

	@Test
	public void test05_create_client() {
		ClientDetailDto clientDetailDto = new ClientDetailDto();
		clientDetailDto.setClientType(ClientType.PUBLIC);
		clientDetailDto.setClientId(clientId);
		clientDetailDto.setRedirectUris(create_redirecturis);
		clientDetailDto.setDefaultClientScopes(defaultscopes);
		clientDetailDto.setName(clientId);
		clientDetailDto.setAppLaunchUrl(launchurl);
		clientService.createClient(clientDetailDto);
		List<RetrieveClientDto> retrieveClientDtos = oAuth2ClientRestClient.getIDClient(clientId);
		assertTrue("List Datqa client", retrieveClientDtos.size() > 0);
		assertNotNull(retrieveClientDtos.get(0).getId());
	}

	@Test
	public void test06_update_client() {
		ClientDetailDto clientDetailDto = new ClientDetailDto();
		clientDetailDto.setClientType(ClientType.PUBLIC);
		clientDetailDto.setClientId(clientId);
		clientDetailDto.setRedirectUris(update_redirecturis);
		clientDetailDto.setDefaultClientScopes(defaultscopes);
		clientDetailDto.setName(clientId);
		clientDetailDto.setAppLaunchUrl(launchurl);
		clientService.updateClient(clientId, clientDetailDto);
	}

	@Test
	public void test07_delete_client() {
		clientService.deleteClient(clientId);
	}

	@Test
	public void test08_launch_service_should_be_defined() {
		boolean isDefined = launchService != null;
		assertTrue(isDefined);
	}

	@Test
	public void test09_launch_service_should_throw_exeception_if_invalid_get_method() {
		boolean isDefined = launchService != null;
		assertTrue(isDefined);

		boolean enteredInExeption = false;

		try {
			LaunchResponseDto response = launchService.get("test_not_found", Optional.of("test_no_user"));
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		assertTrue(enteredInExeption);
	}

	@Test
	public void test10_launch_service_should_have_a_create_method() {
		boolean isDefined = launchService != null;
		assertTrue(isDefined);

		boolean enteredInExeption = false;
		LaunchResponseDto response = null;
		LaunchRequestDto launchRequest = new LaunchRequestDto();
		launchRequest.setPatient("6be3f71a-75c5-4862-ae1e-6f7bfec5a384");
		launchRequest.setOrganization("fd7b5daa-3a00-4bb5-bef2-c1d5ed375c6e");

		try {
			response = launchService.create(launchRequest);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		String launchId = response.getLaunch();

		assertFalse(enteredInExeption);
		assertNotNull(response);
		assertNotNull(launchId);
	}

	@Test
	public void test11_launch_service_should_return_get_method() {
		boolean isDefined = launchService != null;
		assertTrue(isDefined);

		boolean enteredInExeption = false;
		LaunchResponseDto responseCreate = null;
		LaunchRequestDto launchRequest = new LaunchRequestDto();
		launchRequest.setPatient("6be3f71a-75c5-4862-ae1e-6f7bfec5a384");
		launchRequest.setOrganization("fd7b5daa-3a00-4bb5-bef2-c1d5ed375c6e");

		try {
			responseCreate = launchService.create(launchRequest);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		String launchId = responseCreate.getLaunch();

		assertFalse(enteredInExeption);
		assertNotNull(responseCreate);
		assertNotNull(launchId);

		boolean getEnteredInExeption = false;
		LaunchResponseDto responseGet = null;

		try {
			responseGet = launchService.get(launchId, Optional.empty());
		} catch (InvalidOrExpiredLaunchIdException exception) {
			getEnteredInExeption = true;
		}

		assertFalse(getEnteredInExeption);
		assertNotNull(responseGet);
	}

	@Test
	public void test12_launch_service_should_have_merge_n_save_method() {
		boolean isDefined = launchService != null;
		assertTrue(isDefined);

		String originalPatientId = "6be3f71a-75c5-4862-ae1e-6f7bfec5a384";
		String originalOrgId = "fd7b5daa-3a00-4bb5-bef2-c1d5ed375c6e";

		boolean enteredInExeption = false;

		LaunchRequestDto launchRequest = new LaunchRequestDto();
		launchRequest.setPatient(originalPatientId);
		launchRequest.setOrganization(originalOrgId);

		LaunchResponseDto responseCreate = null;

		try {
			responseCreate = launchService.create(launchRequest);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		String launchId = responseCreate.getLaunch();

		assertFalse(enteredInExeption);
		assertNotNull(responseCreate);
		assertNotNull(launchId);

		boolean getEnteredInExeption = false;

		String newPatientId = "608a77ef-3571-4818-ad68-d844da8180c1";
		LaunchRequestDto launchRequestMergeAndSave = new LaunchRequestDto();
		launchRequestMergeAndSave.setPatient(newPatientId);

		LaunchResponseDto responseMergeAndSave = null;

		try {
			responseMergeAndSave = launchService.mergeAndSave(launchId, launchRequestMergeAndSave);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			getEnteredInExeption = true;
		}

		String responsePatientId = responseMergeAndSave.getPatient();
		String responseOrgId = responseMergeAndSave.getOrganization();

		assertFalse(getEnteredInExeption);
		assertNotNull(responseMergeAndSave);
		assertNotNull(responseOrgId);
		assertNotNull(responsePatientId);
		assertEquals(originalOrgId, responseOrgId);
		assertEquals(newPatientId, responsePatientId);
	}

	@Test
	public void test13_launch_service_should_have_override_n_save_method() {
		boolean isDefined = launchService != null;
		assertTrue(isDefined);

		String originalPatientId = "6be3f71a-75c5-4862-ae1e-6f7bfec5a384";
		String originalOrgId = "fd7b5daa-3a00-4bb5-bef2-c1d5ed375c6e";

		boolean enteredInExeption = false;

		LaunchRequestDto launchRequest = new LaunchRequestDto();
		launchRequest.setPatient(originalPatientId);
		launchRequest.setOrganization(originalOrgId);

		LaunchResponseDto responseCreate = null;

		try {
			responseCreate = launchService.create(launchRequest);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		String launchId = responseCreate.getLaunch();

		assertFalse(enteredInExeption);
		assertNotNull(responseCreate);
		assertNotNull(launchId);

		boolean overrideEnteredInExeption = false;

		String newPatientId = "608a77ef-3571-4818-ad68-d844da8180c1";
		LaunchRequestDto launchRequestOverrideAndSave = new LaunchRequestDto();
		launchRequestOverrideAndSave.setPatient(newPatientId);

		LaunchResponseDto responseOverrideAndSave = null;

		try {
			responseOverrideAndSave = launchService.overrideAndSave(launchId, launchRequestOverrideAndSave);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			overrideEnteredInExeption = true;
		}

		String responsePatientId = responseOverrideAndSave.getPatient();
		String responseOrgId = responseOverrideAndSave.getOrganization();

		assertFalse(overrideEnteredInExeption);
		assertNotNull(responseOverrideAndSave);
		assertNull(responseOrgId);
		assertNotNull(responsePatientId);
		assertEquals(newPatientId, responsePatientId);
	}

	@Test
	public void test14_launch_service_should_have_delete_method() {
		assertNotNull(launchService);

		String originalPatientId = "6be3f71a-75c5-4862-ae1e-6f7bfec5a384";
		String originalOrgId = "fd7b5daa-3a00-4bb5-bef2-c1d5ed375c6e";

		boolean enteredInExeption = false;

		LaunchRequestDto launchRequest = new LaunchRequestDto();
		launchRequest.setPatient(originalPatientId);
		launchRequest.setOrganization(originalOrgId);

		LaunchResponseDto responseCreate = null;

		try {
			responseCreate = launchService.create(launchRequest);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		String launchId = responseCreate.getLaunch();

		assertFalse(enteredInExeption);
		assertNotNull(responseCreate);
		assertNotNull(launchId);

		launchService.delete(launchId, Optional.empty());

		boolean getEnteredInExeption = false;
		LaunchResponseDto responseGet = null;

		try {
			responseGet = launchService.get(launchId, Optional.empty());
		} catch (InvalidOrExpiredLaunchIdException exception) {
			getEnteredInExeption = true;
		}

		assertTrue(getEnteredInExeption);
		assertNull(responseGet);
	}

	@Test
	public void test15_authorization_service_should_be_defined() {
		assertNotNull(authorizationService);
	}

	@Test
	public void test16_authorization_service_should_have_redirect_method() {
		assertNotNull(authorizationService);

		assertNotNull(launchService);

		String originalPatientId = "6be3f71a-75c5-4862-ae1e-6f7bfec5a384";
		String originalOrgId = "fd7b5daa-3a00-4bb5-bef2-c1d5ed375c6e";

		boolean enteredInExeption = false;

		LaunchRequestDto launchRequest = new LaunchRequestDto();
		launchRequest.setPatient(originalPatientId);
		launchRequest.setOrganization(originalOrgId);

		LaunchResponseDto responseCreate = null;

		try {
			responseCreate = launchService.create(launchRequest);
		} catch (InvalidOrExpiredLaunchIdException exception) {
			enteredInExeption = true;
		}

		String launchId = responseCreate.getLaunch();

		assertFalse(enteredInExeption);
		assertNotNull(responseCreate);
		assertNotNull(launchId);

		String clientId = "c2s_sof_app_local";
		String scope = "patient/Patient.read patient/Consent.* launch launch/patient openid profile user/Organization.read user/Practitioner.read user/PractitionerRole.read user/StructureDefinition.read user/Provenance.write patient/CareTeam.read user/ValueSet.read $expand";
		String redirectUri = "https://example-url.com/c2s-sof-ui";
		String state = "brWsA1MCpO";
		String aud = "https://dev-fhir-proxy-hbj57tqowq-uc.a.run.app/api/fhir-proxy";

		boolean authEnteredInExeption = false;
		URI resultUri = null;

		try {
			resultUri = authorizationService.getRedirectUri(clientId, ResponseType.code, scope, redirectUri, state,
					aud, launchId, Optional.empty(), Optional.empty());
		} catch (Exception exception) {
			authEnteredInExeption = true;
		}

		assertFalse(authEnteredInExeption);
		assertNotNull(resultUri);
	}

	@Test
	public void test17_token_service_should_be_defined() {
		assertNotNull(tokenService);
	}

	@Test
	public void test18_token_service_should_have_get_token_method() {
		assertNotNull(tokenService);

		boolean getTokenEnteredInExeption = false;
		TokenResponseDto tokenResponseDto = null;

		String code = "88d98412-706b-4ac2-b0f8-f26bff67fe67.659f94ae-2176-47e4-9b28-4f5328e35cec.0f67d1df-9ce6-4b08-8adc-d844372d279a";
		String clientId = "c2s_sof_app_local";
		String redirectUri = "https://example-url.com/c2s-sof-ui";

		try {
			tokenResponseDto = tokenService.getToken(Optional.empty(), GrantType.authorization_code, Optional.empty(),
					Optional.of(code),
					Optional.of(clientId), Optional.of(redirectUri), Optional.empty());
		} catch (Exception exception) {
			getTokenEnteredInExeption = true;
		}

		assertFalse(getTokenEnteredInExeption);
		assertNotNull(tokenResponseDto);
	}

	private void create_client_for_launcher_test() {
		ClientDetailDto clientDetailDto = new ClientDetailDto();
		clientDetailDto.setClientType(ClientType.PUBLIC);
		clientDetailDto.setClientId(clientId);
		clientDetailDto.setRedirectUris(create_redirecturis);
		clientDetailDto.setDefaultClientScopes(defaultscopes);
		clientDetailDto.setName(clientId);
		clientDetailDto.setAppLaunchUrl(launchurl);
		clientService.createClient(clientDetailDto);
	}

	private void delete_client_after_launcher_test() {
		clientService.deleteClient(clientId);
	}

	private String getclientId_launcher_test() {
		List<RetrieveClientDto> data = oAuth2ClientRestClient.getIDClient(clientId);
		return data.get(0).getId();
	}

	private boolean params_contains(String subs, List<String> params) {
		for (String parameter : params) {
			if (parameter.contains(subs)) {
				return true;
			}
		}
		return false;
	}

	@Test
	public void test19_launcher_redirect_uri() {
		create_client_for_launcher_test();
		String keycloak_id = getclientId_launcher_test();
		URI uri = launcherService.getLaunchRedirectUri(keycloak_id, Optional.empty());
		String parameters = uri.getQuery();
		assertNotNull(parameters);

		List<String> arr_params = new ArrayList<>();
		String[] params = parameters.split("&");
		Collections.addAll(arr_params, params);
		assertTrue("Contains Parameters", arr_params.size() > 0);
		assertTrue("Contains issuer", params_contains("iss", arr_params));
		assertTrue("Contains launch", params_contains("launch", arr_params));
		delete_client_after_launcher_test();
	}

}
