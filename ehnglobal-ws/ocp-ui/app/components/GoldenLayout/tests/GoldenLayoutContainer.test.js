/*
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import GoldenLayoutContainer from '../GoldenLayoutContainer';

configure({ adapter: new Adapter() });

describe('<GoldenLayoutContainer />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Act
      const renderedComponent = shallow(<GoldenLayoutContainer />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('styling tests', () => {
    it('should have GoldenLayout root style to reduce the height by considering app bar height', () => {
      // Act
      const renderedComponent = shallow(<GoldenLayoutContainer />);

      // Assert
      expect(renderedComponent).toHaveStyleRule('height', 'calc(100vh - 75px)', {
        modifier: ' .lm_root',
      });
    });

    it('should have GoldenLayout content style to add scrollbar', () => {
      // Act
      const renderedComponent = shallow(<GoldenLayoutContainer />);

      // Assert
      expect(renderedComponent).toHaveStyleRule('overflow', 'auto', {
        modifier: ' .lm_content',
      });
    });

    it('should have GoldenLayout title style to set to uppercase', () => {
      // Act
      const renderedComponent = shallow(<GoldenLayoutContainer />);

      // Assert
      expect(renderedComponent).toHaveStyleRule('text-transform', 'uppercase', {
        modifier: ' .lm_title',
      });
    });
  });
});
*/
