import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TableRowColumn from '../index';

configure({ adapter: new Adapter() });

describe('<TableRowColumn />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableRowColumn>Row</TableRowColumn>),
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
