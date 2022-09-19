import React from 'react';
import { FormattedMessage } from 'react-intl';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import NotFoundPage from '../index';
import messages from '../messages';

configure({ adapter: new Adapter() });

describe('<NotFoundPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <NotFoundPage />
    );
    expect(renderedComponent.contains(
      <FormattedMessage {...messages.header} />
    )).toEqual(true);
  });
});
