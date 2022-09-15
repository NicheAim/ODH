import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ContentContainer from '../ContentContainer';

configure({ adapter: new Adapter() });

describe('<ContentContainer />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ContentContainer>{children}</ContentContainer>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ContentContainer>{children}</ContentContainer>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ContentContainer>{children}</ContentContainer>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('position', 'relative');
      expect(renderedComponent).toHaveStyleRule('width', '100%');
      expect(renderedComponent).toHaveStyleRule('padding-top', '65px');
      expect(renderedComponent).toHaveStyleRule('padding-bottom', '5px');
    });
  });
});
