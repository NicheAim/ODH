import request from 'utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import { getHealthcareServicesByOrganization } from '../api';

jest.mock('utils/request');
jest.mock('utils/endpointService');

describe('Healthcare Services api.js', () => {
  const mockRequest = jest.fn();
  const mockGetEndpoint = jest.fn();

  beforeEach(() => {
    mockGetEndpoint.mockReturnValue('/base-url/organizations');
    // endpointService.getEndpoint = mockGetEndpoint;
    request.mockImplementation(mockRequest);
    getEndpoint.mockImplementation(mockGetEndpoint);
  });

  afterEach(() => {
    mockRequest.mockReset();
    mockGetEndpoint.mockReset();
  });

  it('returns the initial state', () => {
    // Arrange
    const expected = '/base-url/organizations/902/healthcare-services?statusList=active%2Cinactive&pageNumber=1&pageSize=10';

    // Act
    getHealthcareServicesByOrganization(902, ['active', 'inactive'], 1);

    // Assert
    expect(mockGetEndpoint).toBeCalledWith(BASE_ORGANIZATIONS_API_URL);
    expect(mockRequest).toBeCalledWith(expected);
  });
});
