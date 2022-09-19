import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import SearchContainerGrid from '../SearchContainerGrid';

configure({ adapter: new Adapter() });

describe('<SearchContainerGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchContainerGrid>{children}</SearchContainerGrid>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchContainerGrid>{children}</SearchContainerGrid>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchContainerGrid>{children}</SearchContainerGrid>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchContainerGrid>{children}</SearchContainerGrid>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('padding', '4px 2px');
      expect(renderedComponent).toHaveStyleRule('margin', '2px 5px');
    });
  });
});
