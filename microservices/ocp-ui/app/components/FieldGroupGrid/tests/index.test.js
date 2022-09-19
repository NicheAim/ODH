import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import FieldGroupGrid from '../index';

configure({ adapter: new Adapter() });

describe('<FieldGroupGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot with no gap prop', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<FieldGroupGrid>{children}</FieldGroupGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should match snapshot with gap prop', () => {
      // Arrange
      const children = <div>test</div>;
      const gap = '10';

      // Act
      const renderedComponent = shallow(<FieldGroupGrid gap={gap}>{children}</FieldGroupGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<FieldGroupGrid>{children}</FieldGroupGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });

    it('should default gap to 0', () => {
      // Arrange
      const children = <div>test</div>;
      const defaultGap = '0';

      // Act
      const renderedComponent = shallow(<FieldGroupGrid>{children}</FieldGroupGrid>);

      // Assert
      expect(renderedComponent.props().gap).toEqual(defaultGap);
    });

    it('should use pass the configured gap', () => {
      // Arrange
      const children = <div>test</div>;
      const gap = '10';

      // Act
      const renderedComponent = shallow(<FieldGroupGrid gap={gap}>{children}</FieldGroupGrid>);

      // Assert
      expect(renderedComponent.props().gap).toEqual(gap);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<FieldGroupGrid>{children}</FieldGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });
  });
});
