/*
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import SearchHeader from '../SearchHeader';

configure({ adapter: new Adapter() });

describe('<SearchHeader />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchHeader>{children}</SearchHeader>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchHeader>{children}</SearchHeader>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchHeader>{children}</SearchHeader>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
      expect(renderedComponent).toHaveStyleRule('color', '#3275c1');
      expect(renderedComponent).toHaveStyleRule('padding', '5px 20px');
      expect(renderedComponent).toHaveStyleRule('font-size', '1.1rem');
      expect(renderedComponent).toHaveStyleRule('background-color', '#eee');
    });
  });
});
*/
