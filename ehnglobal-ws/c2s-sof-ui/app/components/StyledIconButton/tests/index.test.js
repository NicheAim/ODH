import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import NavigationMenu from '@material-ui/icons/Menu';

import StyledIconButton from '../index';

configure({ adapter: new Adapter() });

describe('<StyledIconButton />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Act
      const renderedComponent = shallow(<StyledIconButton><NavigationMenu /></StyledIconButton>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
