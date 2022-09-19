import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import TodoCard from 'components/ToDoCard';


configure({ adapter: new Adapter() });

describe('<ToDoCard />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<TodoCard>{children}</TodoCard>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have styles', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<TodoCard>{children}</TodoCard>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('padding-bottom', '4px !important');
    expect(renderedComponent).toHaveStyleRule('margin-top', '10px');
    expect(renderedComponent).toHaveStyleRule('min-height', '150px');
    expect(renderedComponent).toHaveStyleRule('border', '1px solid rgb(204, 204, 204)');
  });
});
