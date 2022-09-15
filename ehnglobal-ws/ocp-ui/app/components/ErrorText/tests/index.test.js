import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ErrorText from '../index';

configure({ adapter: new Adapter() });

describe('<ErrorText />', () => {
  describe('snapshot tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ErrorText>{children}</ErrorText>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ErrorText>{children}</ErrorText>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ErrorText>{children}</ErrorText>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('color', 'rgb(244, 67, 54)');
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin-left', '1vw');
    });
  });
});
