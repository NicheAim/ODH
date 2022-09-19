import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import InfoSection from '../index';

configure({ adapter: new Adapter() });

describe('<InfoSection />', () => {
  describe('snapshot tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<InfoSection>{children}</InfoSection>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<InfoSection>{children}</InfoSection>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have default styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<InfoSection>{children}</InfoSection>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('margin', '10px 10px');
      expect(renderedComponent).toHaveStyleRule('width', 'auto');
      expect(renderedComponent).toHaveStyleRule('max-width', 'none');
    });

    it('should have custom styles', () => {
      // Arrange
      const children = (<span>test</span>);
      const margin = '20px';
      const width = '200px';
      const maxWidth = '500pc';
      const props = { margin, width, maxWidth };

      // Act
      const renderedComponent = shallow(<InfoSection {...props}>{children}</InfoSection>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('margin', margin);
      expect(renderedComponent).toHaveStyleRule('width', width);
      expect(renderedComponent).toHaveStyleRule('max-width', maxWidth);
    });
  });
});
