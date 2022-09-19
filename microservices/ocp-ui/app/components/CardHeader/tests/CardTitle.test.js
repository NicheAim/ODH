import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import CardTitle from '../CardTitle';

configure({ adapter: new Adapter() });

describe('<CardTitle />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CardTitle>{children}</CardTitle>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have styles', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CardTitle>{children}</CardTitle>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('font-size', '1.3rem');
    expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
    expect(renderedComponent).toHaveStyleRule('color', '#3275c1');
  });
});
