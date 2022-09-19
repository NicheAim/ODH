import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TableHeaderColumn from '../index';

configure({ adapter: new Adapter() });

describe('<TableHeaderColumn />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableHeaderColumn>Col</TableHeaderColumn>));

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
