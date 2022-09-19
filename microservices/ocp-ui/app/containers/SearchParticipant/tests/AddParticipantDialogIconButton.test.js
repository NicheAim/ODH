import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import ActionSearch from '@material-ui/icons/Search';

import AddParticipantDialogIconButton from '../AddParticipantDialogIconButton';

configure({ adapter: new Adapter() });

describe('<AddParticipantDialogIconButton />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = (<ActionSearch />);

      // Act
      const renderedComponent = shallow(<AddParticipantDialogIconButton>{children}</AddParticipantDialogIconButton>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<ActionSearch />);

      // Act
      const renderedComponent = shallow(<AddParticipantDialogIconButton>{children}</AddParticipantDialogIconButton>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have material-ui props for styling', () => {
      // Arrange
      const children = (<ActionSearch />);
      const expectedProps = {
        style: { top: '26px', height: '30px' },
      };

      // Act
      const renderedComponent = shallow(<AddParticipantDialogIconButton>{children}</AddParticipantDialogIconButton>);

      // Assert
      expect(renderedComponent.props().contentStyle).toEqual(expectedProps.contentStyle);
    });
  });
});
