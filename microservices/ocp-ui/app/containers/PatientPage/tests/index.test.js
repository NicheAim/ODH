/*
import GoldenLayout from 'components/GoldenLayout';
import { PATIENT_ROLE_CODE } from 'containers/App/constants';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import 'mock-local-storage';
import React from 'react';

import { componentMetadata, defaultRoleStateMetadata, PatientPage } from '../index';

configure({ adapter: new Adapter() });

describe('<PatientPage />', () => {
  describe('snapshot tests', () => {
    // Arrange
    const id = 'id';
    const params = { id };
    const match = { params };
    const getPatient = jest.fn();
    const user = { role: PATIENT_ROLE_CODE };
    const patient = {
      id: '1',
      name: ['test'],
    };
    const props = { match, patient, user };
    // Act
    const renderedComponent = shallow(<PatientPage {...props} getPatient={getPatient} />);

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });

  describe('behavioral tests', () => {
    it('should call getPatient with match.params.id', () => {
      // Arrange
      const id = 'id';
      const params = { id };
      const match = { params };
      const getPatient = jest.fn();
      const user = { role: PATIENT_ROLE_CODE };
      const patient = {
        id: '1',
        name: ['test'],
      };
      const props = { match, patient, user };

      // Act
      shallow(<PatientPage {...props} getPatient={getPatient} />);

      // Assert
      expect(getPatient).toBeCalledWith(id);
    });

    it('should call getPatient only once', () => {
      // Arrange
      const id = 'id';
      const params = { id };
      const match = { params };
      const getPatient = jest.fn();
      const user = { role: PATIENT_ROLE_CODE };
      const props = { match, user };

      // Act
      shallow(<PatientPage {...props} getPatient={getPatient} />);

      // Assert
      expect(getPatient).toHaveBeenCalledTimes(1);
    });
  });

  describe('structural tests', () => {
    it('should contain <GoldenLayout />', () => {
      // Arrange
      const id = 'id';
      const params = { id };
      const match = { params };
      const getPatient = jest.fn();
      const user = { role: PATIENT_ROLE_CODE };
      const patient = {
        id: '1',
        name: ['test'],
      };
      const props = { match, patient, user };

      // Act
      const renderedComponent = shallow(<PatientPage {...props} getPatient={getPatient} />);

      // Assert
      expect(renderedComponent.find(GoldenLayout).exists()).toBeTruthy();
      expect(renderedComponent.contains(
        <GoldenLayout
          containerId="golden-patient"
          containerHeight="75vh"
          containerWidth="95vw"
          componentMetadata={componentMetadata}
          stateMetadata={defaultRoleStateMetadata}
        />)).toEqual(true);
    });
  });
});
*/
