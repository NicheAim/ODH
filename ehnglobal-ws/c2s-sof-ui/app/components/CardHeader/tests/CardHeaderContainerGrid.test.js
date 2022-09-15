import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import CardHeaderContainerGrid from '../CardHeaderContainerGrid';

configure({ adapter: new Adapter() });

describe('<CardHeaderContainerGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CardHeaderContainerGrid>{children}</CardHeaderContainerGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CardHeaderContainerGrid>{children}</CardHeaderContainerGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CardHeaderContainerGrid>{children}</CardHeaderContainerGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have margin-top', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<CardHeaderContainerGrid>{children}</CardHeaderContainerGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('margin-top', '5px');
    });
  });
});
