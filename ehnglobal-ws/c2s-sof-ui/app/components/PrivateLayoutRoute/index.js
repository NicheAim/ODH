/**
 *
 * PrivateLayoutRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid } from 'styled-css-grid';
import PrivateHeader from 'containers/PrivateHeader';


function PrivateLayoutRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Grid columns={1}>
          <PrivateHeader />
          <Component {...matchProps} />
        </Grid>
      )}
    />
  );
}

PrivateLayoutRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateLayoutRoute;
