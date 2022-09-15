import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import LeftAlign from '../LeftAlign';

configure({ adapter: new Adapter() });


describe('<LeftAlign />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<LeftAlign>{children}</LeftAlign>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have left align style', () => {
    // Arrange
    const variant = 'left';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<LeftAlign>{children}</LeftAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should always use left align style with valid variants', () => {
    // Arrange
    const variant = 'center';
    const expected = 'left';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<LeftAlign variant={variant}>{children}</LeftAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should always use left align style for invalid variants', () => {
    // Arrange
    const variant = 'invalid';
    const expected = 'left';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<LeftAlign variant={variant}>{children}</LeftAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });
});
