import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import CardHeader from '../index';
import CardTitle from '../CardTitle';

configure({ adapter: new Adapter() });

describe('<CardHeader />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = (<span>test</span>);
      const title = <span>title</span>;

      // Act
      const renderedComponent = shallow(<CardHeader title={title}>{children}</CardHeader>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);
      const title = <span>title</span>;

      // Act
      const renderedComponent = shallow(<CardHeader title={title}>{children}</CardHeader>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });

    it('should contain CardTitle', () => {
      // Arrange
      const children = (<span>test</span>);
      const title = <span>title</span>;
      const cardTitle = (<CardTitle>{title}</CardTitle>);

      // Act
      const renderedComponent = shallow(<CardHeader title={title}>{children}</CardHeader>);

      // Assert
      expect(renderedComponent.contains(cardTitle)).toEqual(true);
    });
  });
});
