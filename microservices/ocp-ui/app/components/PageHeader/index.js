/**
 *
 * PageHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

import PageTitle from './PageTitle';

function PageHeader({ title }) {
  return (
    <div>
      <PageTitle>{title}</PageTitle>
      <Divider />
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
};

export default PageHeader;
