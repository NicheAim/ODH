import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import CheckboxGrid from '../CheckboxGrid';

configure({ adapter: new Adapter() });

describe('<CheckboxGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CheckboxGrid>{children}</CheckboxGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CheckboxGrid>{children}</CheckboxGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CheckboxGrid>{children}</CheckboxGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have padding', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CheckboxGrid>{children}</CheckboxGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding', '5px 20px');
    });
  });
});
