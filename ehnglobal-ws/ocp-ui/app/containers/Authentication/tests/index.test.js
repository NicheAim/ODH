import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import { Authentication } from '../index';

configure({ adapter: new Adapter() });

describe('<Authentication />', () => {
  it('should match snapshot', () => {
    // Arrange
    const rehydrated = true;
    const isAuthenticated = true;
    const auth = {
      isAuthenticated,
    };
    const user = {
      role: 'Patient',
    };
    const props = {
      auth,
      user,
      rehydrated,
    };

    // Act
    const renderedComponent = shallow(<Authentication {...props} />);

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
