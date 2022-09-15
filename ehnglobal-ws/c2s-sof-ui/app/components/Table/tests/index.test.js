import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Table from '../index';
import TableHeaderColumn from '../../TableHeaderColumn';
import TableHeader from '../../TableHeader';
import TableRow from '../../TableRow';
import TableRowColumn from '../../TableRowColumn';

configure({ adapter: new Adapter() });

describe('<Table />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<Table>
        <TableHeader>
          <TableHeaderColumn>Col</TableHeaderColumn>
        </TableHeader>
        <TableRow>
          <TableRowColumn>Row</TableRowColumn>
        </TableRow>
      </Table>),
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
})
;
