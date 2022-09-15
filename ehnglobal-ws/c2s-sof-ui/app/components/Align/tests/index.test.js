import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import Align from '../index';

configure({ adapter: new Adapter() });


describe('<Align />', () => {
  it('should have children', () => {
    // Arrange
    const variant = 'center';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have center align style', () => {
    // Arrange
    const variant = 'center';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should have left align style', () => {
    // Arrange
    const variant = 'left';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should have right align style', () => {
    // Arrange
    const variant = 'right';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should have justify align style', () => {
    // Arrange
    const variant = 'justify';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should have initial align style', () => {
    // Arrange
    const variant = 'initial';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should have inherit align style', () => {
    // Arrange
    const variant = 'inherit';
    const expected = variant;
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });

  it('should not accept invalid align style', () => {
    // Arrange
    const variant = 'invalid';
    const expected = '';
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<Align variant={variant}>{children}</Align>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('text-align', expected);
  });
});
