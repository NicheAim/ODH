import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Route } from 'react-router-dom';
import 'mock-local-storage';

import { App } from '../index';

configure({ adapter: new Adapter() });

xdescribe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });
});
