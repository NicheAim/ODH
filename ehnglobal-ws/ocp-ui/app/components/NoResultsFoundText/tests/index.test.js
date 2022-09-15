import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import NoResultsFoundText from '../index';

configure({ adapter: new Adapter() });

describe('<NoResultsFoundText />', () => {
  describe('snapshot tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<NoResultsFoundText>{children}</NoResultsFoundText>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<NoResultsFoundText>{children}</NoResultsFoundText>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<NoResultsFoundText>{children}</NoResultsFoundText>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('font-size', '12px');
      expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
      expect(renderedComponent).toHaveStyleRule('color', 'black');
      expect(renderedComponent).toHaveStyleRule('margin', '10px');
    });
  });
});
