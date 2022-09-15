import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import CenterAlign from '../CenterAlign';

configure({ adapter: new Adapter() });


describe('<CenterAlign />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CenterAlign>{children}</CenterAlign>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have center align style', () => {
    // Arrange
    const variant = 'center';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CenterAlign>{children}</CenterAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should always use center align style with valid variants', () => {
    // Arrange
    const variant = 'left';
    const expected = 'center';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CenterAlign variant={variant}>{children}</CenterAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should always use center align style for invalid variants', () => {
    // Arrange
    const variant = 'invalid';
    const expected = 'center';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CenterAlign variant={variant}>{children}</CenterAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });
});
