import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import SearchButtonContainerGrid from '../SearchButtonContainerGrid';

configure({ adapter: new Adapter() });

describe('<SearchButtonContainerGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchButtonContainerGrid>{children}</SearchButtonContainerGrid>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchButtonContainerGrid>{children}</SearchButtonContainerGrid>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchButtonContainerGrid>{children}</SearchButtonContainerGrid>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchButtonContainerGrid>{children}</SearchButtonContainerGrid>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('padding-left', '20px');
      expect(renderedComponent).toHaveStyleRule('padding-top', '5px');
      expect(renderedComponent).toHaveStyleRule('padding-bottom', '15px');
    });
  });
});
