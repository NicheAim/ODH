import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import { ShowHideWrapper } from '../index';

configure({ adapter: new Adapter() });

describe('<ShowHideWrapper />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;
      const role = 'ocpAdminRole';
      const user = { role };
      const allowedRoles = ['ocpAdminRole'];
      const props = {
        user,
        allowedRoles,
      };

      // Act
      const renderedComponent = shallow(<ShowHideWrapper {...props} >{children}</ShowHideWrapper>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;
      const role = 'ocpAdminRole';
      const user = { role };
      const allowedRoles = ['ocpAdminRole'];
      const props = {
        user,
        allowedRoles,
      };

      // Act
      const renderedComponent = shallow(<ShowHideWrapper {...props}>{children}</ShowHideWrapper>);

      // Assert
      expect(renderedComponent.contains(children)).toBeTruthy();
    });
  });
});
