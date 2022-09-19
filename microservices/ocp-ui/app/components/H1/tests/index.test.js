import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15/build/index';
import 'jest-styled-components';

import H1 from '../index';

configure({ adapter: new Adapter() });

describe('<H1 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(
      <H1 id={id} />,
    );
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(
      <H1>{children}</H1>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should have styles', () => {
    const renderedComponent = shallow(
      <H1 />,
    );
    expect(renderedComponent).toHaveStyleRule('font-size', '2em');
    expect(renderedComponent).toHaveStyleRule('margin-bottom', '0.25em');
  });
});
