import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import CenterAlignedUltimatePagination from '../index';

configure({ adapter: new Adapter() });

describe('<CenterAlignedUltimatePagination />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const currentPage = 5;
      const totalPages = 10;
      const onChange = jest.fn();
      const props = { currentPage, totalPages, onChange };

      // Act
      const renderedComponent = shallow(<CenterAlignedUltimatePagination {...props} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have passed props', () => {
      // Arrange
      const currentPage = 5;
      const totalPages = 10;
      const onChange = jest.fn();
      const props = { currentPage, totalPages, onChange };

      // Act
      const renderedComponent = shallow(<CenterAlignedUltimatePagination {...props} />);

      // Assert
      expect(renderedComponent.props().children.props.currentPage).toEqual(currentPage);
      expect(renderedComponent.props().children.props.totalPages).toEqual(totalPages);
      expect(renderedComponent.props().children.props.onChange).toEqual(onChange);
    });

    it('should have default props', () => {
      // Arrange
      const currentPage = 5;
      const totalPages = 10;
      const onChange = jest.fn();
      const props = { currentPage, totalPages, onChange };
      const defaultProps = {
        boundaryPagesRange: 1,
        siblingPagesRange: 1,
        hidePreviousAndNextPageLinks: false,
        hideFirstAndLastPageLinks: false,
        hideEllipsis: false,
      };

      // Act
      const renderedComponent = shallow(<CenterAlignedUltimatePagination {...props} />);

      // Assert
      expect(renderedComponent.props().children.props.boundaryPagesRange).toEqual(defaultProps.boundaryPagesRange);
      expect(renderedComponent.props().children.props.siblingPagesRange).toEqual(defaultProps.siblingPagesRange);
      expect(renderedComponent.props().children.props.hidePreviousAndNextPageLinks).toEqual(defaultProps.hidePreviousAndNextPageLinks);
      expect(renderedComponent.props().children.props.hideFirstAndLastPageLinks).toEqual(defaultProps.hideFirstAndLastPageLinks);
      expect(renderedComponent.props().children.props.hideEllipsis).toEqual(defaultProps.hideEllipsis);
    });
  });

  describe('styling tests', () => {
    it('should have text-align: center', () => {
      // Arrange
      const currentPage = 5;
      const totalPages = 10;
      const onChange = jest.fn();
      const props = { currentPage, totalPages, onChange };

      // Act
      const renderedComponent = shallow(<CenterAlignedUltimatePagination {...props} />);

      // Assert
      expect(renderedComponent).toHaveStyleRule('text-align', 'center');
    });
  });
});
