import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import { CareTeams } from '../index';

configure({ adapter: new Adapter() });

const user = {
  role: 'patientRole',
};
describe('<CareTeams />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const initializeLookups = jest.fn();
      const initializeCareTeams = jest.fn();
      const getCareTeams = jest.fn();
      const query = { a1: 'a1', a2: 'a2' };
      const firstName = 'firstName';
      const lastName = 'lastName';
      const patient = { name: [{ firstName, lastName }] };
      const statusList = ['active', 'inactive'];
      const loading = false;
      const elements = [{
        id: '1',
        name: 'a',
        subjectId: 'subjectId1',
        subjectFirstName: 'subjectFirstName1',
        subjectLastName: 'subjectLastName1',
      }, {
        id: '2',
        name: 'b',
        subjectId: 'subjectId2',
        subjectFirstName: 'subjectFirstName2',
        subjectLastName: 'subjectLastName2',
      }];
      const currentPage = 10;
      const totalNumberOfPages = 100;
      const data = {
        elements,
        currentPage,
        totalNumberOfPages,
      };
      const careTeams = {
        loading,
        data,
        query,
        statusList,
      };
      const careTeamStatuses = [{
        code: 'active',
        display: 'Active',
      }, {
        code: 'inactive',
        display: 'Inactive',
      }, {
        code: 'suspended',
        display: 'suspended',
      }];
      const props = {
        getCareTeams,
        initializeLookups,
        initializeCareTeams,
        careTeams,
        careTeamStatuses,
        patient,
        user,
      };

      // Act
      const renderedComponent = shallow(<CareTeams {...props} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain patient name', () => {
      // Arrange
      const initializeLookups = jest.fn();
      const initializeCareTeams = jest.fn();
      const getCareTeams = jest.fn();
      const query = { a1: 'a1', a2: 'a2' };
      const firstName = 'firstName';
      const lastName = 'lastName';
      const patient = { name: [{ firstName, lastName }] };
      const statusList = ['active', 'inactive'];
      const loading = false;
      const elements = [{
        id: '1',
        name: 'a',
        subjectId: 'subjectId1',
        subjectFirstName: 'subjectFirstName1',
        subjectLastName: 'subjectLastName1',
      }, {
        id: '2',
        name: 'b',
        subjectId: 'subjectId2',
        subjectFirstName: 'subjectFirstName2',
        subjectLastName: 'subjectLastName2',
      }];
      const currentPage = 10;
      const totalNumberOfPages = 100;
      const data = {
        elements,
        currentPage,
        totalNumberOfPages,
      };
      const careTeams = {
        loading,
        data,
        query,
        patient,
        statusList,
      };
      const careTeamStatuses = [{
        code: 'active',
        display: 'Active',
      }, {
        code: 'inactive',
        display: 'Inactive',
      }, {
        code: 'suspended',
        display: 'suspended',
      }];
      const props = {
        getCareTeams,
        initializeLookups,
        initializeCareTeams,
        patient,
        careTeams,
        careTeamStatuses,
        user,
      };

      // Act
      const renderedComponent = shallow(<CareTeams {...props} />);

      // Assert
      expect(renderedComponent.contains(`${firstName} ${lastName}`)).toBe(true);
    });

    it('should call initialization functions', () => {
      // Arrange
      const initializeLookups = jest.fn();
      const initializeCareTeams = jest.fn();
      const getCareTeams = jest.fn();
      const query = { a1: 'a1', a2: 'a2' };
      const patientName = 'patientName';
      const statusList = ['active', 'inactive'];
      const loading = false;
      const elements = [{
        id: '1',
        name: 'a',
        subjectId: 'subjectId1',
        subjectFirstName: 'subjectFirstName1',
        subjectLastName: 'subjectLastName1',
      }, {
        id: '2',
        name: 'b',
        subjectId: 'subjectId2',
        subjectFirstName: 'subjectFirstName2',
        subjectLastName: 'subjectLastName2',
      }];
      const currentPage = 10;
      const totalNumberOfPages = 100;
      const data = {
        elements,
        currentPage,
        totalNumberOfPages,
      };
      const careTeams = {
        loading,
        data,
        query,
        patientName,
        statusList,
      };
      const careTeamStatuses = [{
        code: 'active',
        display: 'Active',
      }, {
        code: 'inactive',
        display: 'Inactive',
      }, {
        code: 'suspended',
        display: 'suspended',
      }];
      const props = {
        getCareTeams,
        initializeLookups,
        initializeCareTeams,
        careTeams,
        careTeamStatuses,
        user,
      };

      // Act
      shallow(<CareTeams {...props} />);

      // Assert
      expect(initializeLookups).toHaveBeenCalledTimes(1);
      expect(initializeCareTeams).toHaveBeenCalledTimes(1);
    });
  });
});
