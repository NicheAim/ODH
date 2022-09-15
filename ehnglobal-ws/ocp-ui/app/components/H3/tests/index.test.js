import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15/build/index';
import 'jest-styled-components';

import H3 from '../index';

configure({ adapter: new Adapter() });

describe('<H3 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(
      <H3 id={id} />
    );
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H3>{children}</H3>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
