import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import InlineLabel from '../index';

configure({ adapter: new Adapter() });

describe('<InlineLabel />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<InlineLabel>{children}</InlineLabel>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<InlineLabel>{children}</InlineLabel>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have position and height', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<InlineLabel>{children}</InlineLabel>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
      expect(renderedComponent).toHaveStyleRule('display', 'inline-block');
    });
  });
});
