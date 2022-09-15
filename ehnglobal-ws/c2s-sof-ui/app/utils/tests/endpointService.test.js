import {
  BASE_CONSENTS_API_URL,
  BASE_ORGANIZATIONS_API_URL,
  BASE_PATIENTS_API_URL,
  collectEndpoints,
  getEndpoint,
  isSecuredEndpoint,
  LOOKUPS_API_URL,
} from '../endpointService';


describe('endpointService.js', () => {
  it('should contain correct number of configured urls', () => {
    // Arrange
    const numberOfEndpoints = 7;
    const numberOfUnsecuredEndpoints = 1;

    // Act
    const configuredEndpoints = collectEndpoints();
    const endpoints = Array.from(configuredEndpoints.values());
    const unsecuredEndpoints = endpoints.filter((ep) => ep.isSecured === false);

    // Assert
    expect(configuredEndpoints.size).toEqual(numberOfEndpoints);
    expect(unsecuredEndpoints.length).toEqual(numberOfUnsecuredEndpoints);
  });

  it('should return with correct request url', () => {
    // Arrange
    const TEST_PATIENTS_API_URL = '/c2s-sof-api/patients';
    const TEST_ORGANIZATIONS_API_URL = '/c2s-sof-api/organizations';
    const TEST_CONSENTS_API_URL = '/c2s-sof-api/consents';
    const TEST_LOOKUP_URL = '/c2s-sof-api/lookups';

    // Act
    const patientsUrl = getEndpoint(BASE_PATIENTS_API_URL);
    const organizationsUrl = getEndpoint(BASE_ORGANIZATIONS_API_URL);
    const consentsUrl = getEndpoint(BASE_CONSENTS_API_URL);
    const lookupUrl = getEndpoint(LOOKUPS_API_URL);

    // Assert
    expect(organizationsUrl).toEqual(TEST_ORGANIZATIONS_API_URL);
    expect(patientsUrl).toEqual(TEST_PATIENTS_API_URL);
    expect(consentsUrl).toEqual(TEST_CONSENTS_API_URL);
    expect(lookupUrl).toEqual(TEST_LOOKUP_URL);
  });

  it('should throw No endpoint configured', () => {
    // Arrange
    const TEST_URL = '/test';

    // Act
    function getTestEndpoint() {
      getEndpoint(TEST_URL);
    }

    // Assert
    expect(getTestEndpoint).toThrowError(`No ${TEST_URL} endpoint configured`);
  });

  it('should verify the endpoint is unsecured or secured', () => {
    // Arrange
    const TEST_LOOKUP_URL = '/c2s-sof-api/lookups?testquery';
    const TEST_ORGANIZATIONS_API_URL = '/c2s-sof-api/organizations?testquery';

    // Act
    const isLookupUrlSecured = isSecuredEndpoint(TEST_LOOKUP_URL);

    const isOrganizationsUrlSecured = isSecuredEndpoint(TEST_ORGANIZATIONS_API_URL);

    // Assert
    expect(isLookupUrlSecured).toBeTruthy();

    expect(isOrganizationsUrlSecured).toBeTruthy();
  });
});
