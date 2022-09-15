import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Login from '../index';

configure({ adapter: new Adapter() });

describe('<Login />', () => {
  it('should match snapshot', () => {
    // Arrange
    const onLogin = jest.fn();

    // Act
    const renderedComponent = shallow(<Login onLogin={onLogin} />);

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
