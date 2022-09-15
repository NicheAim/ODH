import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import TableRowGrid from '../TableRowGrid';

configure({ adapter: new Adapter() });

describe('<TableRowGrid />', () => {
  describe('snapshot tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have border-bottom', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('border-bottom', '1px outset rgb(51, 51, 51)');
    });

    it('should have first-child styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#fff', {
        modifier: ':first-child',
      });
      expect(renderedComponent).toHaveStyleRule('font-size', '20px', {
        modifier: ':first-child',
      });
    });

    it('should have nth-child styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#fff', {
        modifier: ':nth-child(odd)',
      });
    });

    it('should have hover styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowGrid>{children}</TableRowGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#dce4ef', {
        modifier: ':hover',
      });
      expect(renderedComponent).toHaveStyleRule('cursor', 'pointer', {
        modifier: ':hover',
      });
    });
  });
});
