import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { Divider } from 'material-ui';

import PageHeader from '../index';
import PageTitle from '../PageTitle';

configure({ adapter: new Adapter() });

describe('<PageHeader />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const title = <div>title</div>;

      // Act
      const renderedComponent = shallow(<PageHeader title={title}></PageHeader>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain title', () => {
      // Arrange
      const title = <div>title</div>;

      // Act
      const renderedComponent = shallow(<PageHeader title={title}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(title)).toEqual(true);
    });

    it('should contain <PageTitle>{title}</PageTitle>', () => {
      // Arrange
      const title = <div>title</div>;
      const expected = (<PageTitle>{title}</PageTitle>);

      // Act
      const renderedComponent = shallow(<PageHeader title={title}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });

    it('should contain <Divider />', () => {
      // Arrange
      const title = <div>title</div>;
      const expected = (<Divider />);

      // Act
      const renderedComponent = shallow(<PageHeader title={title}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });
  });
});
