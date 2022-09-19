import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import TableHeader from '../index';
import TableHeaderColumn from '../../TableHeaderColumn';

configure({ adapter: new Adapter() });

describe('<TableHeader />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableHeader>
        <TableHeaderColumn>Col</TableHeaderColumn>
      </TableHeader>),
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
