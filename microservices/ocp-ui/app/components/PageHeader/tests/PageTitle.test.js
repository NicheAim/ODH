/*
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import PageTitle from '../PageTitle';

configure({ adapter: new Adapter() });

describe('<PageTitle />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageTitle>{children}</PageTitle>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageTitle>{children}</PageTitle>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageTitle>{children}</PageTitle>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('padding-left', '1vw');
      expect(renderedComponent).toHaveStyleRule('padding-top', '1vh');
      expect(renderedComponent).toHaveStyleRule('padding-bottom', '1vh');
      expect(renderedComponent).toHaveStyleRule('font-size', '1.2rem');
      expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
      expect(renderedComponent).toHaveStyleRule('color', '#3275c1');
    });
  });
});
*/
