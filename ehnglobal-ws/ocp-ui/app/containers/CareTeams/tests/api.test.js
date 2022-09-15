import request from 'utils/request';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from 'utils/endpointService';
import { getCareTeams } from 'containers/CareTeams/api';

jest.mock('utils/request');
jest.mock('utils/endpointService');

describe('CareTeams api.js', () => {
  const mockRequest = jest.fn();
  const mockGetEndpoint = jest.fn();

  beforeEach(() => {
    mockGetEndpoint.mockReturnValue('/base-url/care-teams');
    request.mockImplementation(mockRequest);
    getEndpoint.mockImplementation(mockGetEndpoint);
  });

  afterEach(() => {
    mockRequest.mockReset();
    mockGetEndpoint.mockReset();
  });

  it('should call request with correct request url', () => {
    // Arrange
    const patientId = 'patientId';
    const organizationId = 'organizationId';
    const pageNumber = 2;
    const pageSize = 10;
    const expected = `/base-url/care-teams?organization=${organizationId}&patient=${patientId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    // Act
    getCareTeams(organizationId, patientId, pageNumber, pageSize);

    // Assert
    expect(mockGetEndpoint).toBeCalledWith(BASE_CARE_TEAMS_API_URL);
    expect(mockRequest).toBeCalledWith(expected);
  });
});
