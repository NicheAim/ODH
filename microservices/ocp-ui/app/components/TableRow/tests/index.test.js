import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TableRow from '../index';
import TableRowColumn from '../../TableRowColumn';

configure({ adapter: new Adapter() });

describe('<TableRow />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableRow>
        <TableRowColumn>Row</TableRowColumn>
      </TableRow>)
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
