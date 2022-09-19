import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import RightAlign from '../RightAlign';

configure({ adapter: new Adapter() });


describe('<RightAlign />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<RightAlign>{children}</RightAlign>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have right align style', () => {
    // Arrange
    const variant = 'right';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<RightAlign>{children}</RightAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should always use right align style with valid variants', () => {
    // Arrange
    const variant = 'center';
    const expected = 'right';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<RightAlign variant={variant}>{children}</RightAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should always use right align style for invalid variants', () => {
    // Arrange
    const variant = 'invalid';
    const expected = 'right';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<RightAlign variant={variant}>{children}</RightAlign>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });
});
