import { clearAll, clearOrganization, clearPatient, clearUser, setOrganization, setPatient, setUser } from '../contextActions';
import {
  CLEAR_ALL,
  CLEAR_ORGANIZATION,
  CLEAR_PATIENT,
  CLEAR_USER,
  SET_ORGANIZATION,
  SET_PATIENT,
  SET_USER,
} from '../contextConstants';

describe('Context actions', () => {
  describe('setPatient Action', () => {
    it('has a type of SET_PATIENT', () => {
      // Arrange
      const patient = { firstName: 'firstName' };
      const expected = {
        type: SET_PATIENT,
        patient,
      };

      // Act
      const action = setPatient(patient);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('setOrganization Action', () => {
    it('has a type of SET_ORGANIZATION', () => {
      // Arrange
      const organization = { name: 'name' };
      const expected = {
        type: SET_ORGANIZATION,
        organization,
      };

      // Act
      const action = setOrganization(organization);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('setUser Action', () => {
    it('has a type of SET_USER', () => {
      // Arrange
      const user = { username: 'username' };
      const expected = {
        type: SET_USER,
        user,
      };

      // Act
      const action = setUser(user);

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('clearPatient Action', () => {
    it('has a type of CLEAR_PATIENT', () => {
      // Arrange
      const expected = {
        type: CLEAR_PATIENT,
      };

      // Act
      const action = clearPatient();

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('clearOrganization Action', () => {
    it('has a type of CLEAR_ORGANIZATION', () => {
      // Arrange
      const expected = {
        type: CLEAR_ORGANIZATION,
      };

      // Act
      const action = clearOrganization();

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('clearUser Action', () => {
    it('has a type of CLEAR_USER', () => {
      // Arrange
      const expected = {
        type: CLEAR_USER,
      };

      // Act
      const action = clearUser();

      // Assert
      expect(action).toEqual(expected);
    });
  });

  describe('clearAll Action', () => {
    it('has a type of CLEAR_ALL', () => {
      // Arrange
      const expected = {
        type: CLEAR_ALL,
      };

      // Act
      const action = clearAll();

      // Assert
      expect(action).toEqual(expected);
    });
  });
});
