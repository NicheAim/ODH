import { getCareTeams, getCareTeamsError, getCareTeamsSuccess } from '../actions';
import { GET_CARE_TEAMS, GET_CARE_TEAMS_ERROR, GET_CARE_TEAMS_SUCCESS } from '../constants';

describe('CareTeams actions', () => {
  describe('Get Care Teams Action', () => {
    it('has a type of GET_CARE_TEAMS', () => {
      // Arrange
      const pageNumber = 10;
      const statusList = ['active', 'inactive'];
      const expected = {
        type: GET_CARE_TEAMS,
        pageNumber,
        statusList,
      };

      // Act
      const action = getCareTeams(pageNumber, statusList);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('Get Care Teams Success Action', () => {
    it('has a type of GET_CARE_TEAMS_SUCCESS', () => {
      // Arrange
      const careTeamsPage = {
        hasPreviousPage: false,
        totalNumberOfPages: 2,
        elements: [{ subjectId: '1259' }],
      };
      const expected = {
        type: GET_CARE_TEAMS_SUCCESS,
        careTeamsPage,
      };

      // Act
      const action = getCareTeamsSuccess(careTeamsPage);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('Get Care Teams Error Action', () => {
    it('has a type of GET_CARE_TEAMS_ERROR', () => {
      // Arrange
      const error = new Error('error');
      const expected = {
        type: GET_CARE_TEAMS_ERROR,
        error,
      };

      // Act
      const action = getCareTeamsError(error);

      // Assert
      expect(action).toEqual(expected);
    });
  });
});
