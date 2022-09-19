import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ParticipantSearchContainer from '../ParticipantSearchContainer';

configure({ adapter: new Adapter() });

describe('<ParticipantSearchContainer />', () => {
  describe('snapshot tests', () => {
    it('should snapshots', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ParticipantSearchContainer>{children}</ParticipantSearchContainer>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ParticipantSearchContainer>{children}</ParticipantSearchContainer>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<ParticipantSearchContainer>{children}</ParticipantSearchContainer>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('position', 'relative');
      expect(renderedComponent).toHaveStyleRule('padding', '0 10px');
      expect(renderedComponent).toHaveStyleRule('margin-bottom', '5px');
    });
  });
});
