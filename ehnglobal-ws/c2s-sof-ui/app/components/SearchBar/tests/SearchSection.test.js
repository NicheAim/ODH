import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import SearchSection from '../SearchSection';

configure({ adapter: new Adapter() });

describe('<SearchSection />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchSection>{children}</SearchSection>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchSection>{children}</SearchSection>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<SearchSection>{children}</SearchSection>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('font-size', '1rem');
      expect(renderedComponent).toHaveStyleRule('background-color', '#f9f9f9');
    });
  });
});
