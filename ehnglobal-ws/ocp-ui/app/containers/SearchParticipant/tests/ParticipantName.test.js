import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ParticipantName from '../ParticipantName';

configure({ adapter: new Adapter() });

describe('<ParticipantName />', () => {
  describe('snapshot tests', () => {
    it('should snapshots', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ParticipantName>{children}</ParticipantName>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ParticipantName>{children}</ParticipantName>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ParticipantName>{children}</ParticipantName>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-top', '25px');
      expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
      expect(renderedComponent).toHaveStyleRule('font-size', 'medium');
    });
  });
});
