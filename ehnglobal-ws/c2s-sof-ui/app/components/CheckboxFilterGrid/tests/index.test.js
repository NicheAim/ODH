import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Cell } from 'styled-css-grid';

import CheckboxFilterGrid from '../index';

configure({ adapter: new Adapter() });

describe('<CheckboxFilterGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot with default column calculation', () => {
      // Arrange
      const child1 = (<Cell>child1</Cell>);
      const child2 = (<Cell>child2</Cell>);
      const child3 = (<Cell>child3</Cell>);

      // Act
      const renderedComponent = shallow((<CheckboxFilterGrid>{child1}{child2}{child3}</CheckboxFilterGrid>));

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should match snapshot with column props', () => {
      // Arrange
      const child1 = (<Cell>child1</Cell>);
      const child2 = (<Cell>child2</Cell>);
      const child3 = (<Cell>child3</Cell>);
      const columns = '200px 150px 1f';

      // Act
      const renderedComponent = shallow((
        <CheckboxFilterGrid columns={columns}>{child1}{child2}{child3}</CheckboxFilterGrid>));

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
