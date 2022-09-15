import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import LinearProgressIndicator from '../index';

configure({ adapter: new Adapter() });


describe('<LinearProgressIndicator />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const loading = true;

      // Act
      const renderedComponent = shallow(<LinearProgressIndicator loading={loading} />);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
