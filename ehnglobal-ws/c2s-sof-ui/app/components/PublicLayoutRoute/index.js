/**
 *
 * PublicLayoutRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PublicHeader from 'components/PublicHeader';
import { Grid } from 'styled-css-grid';
import { Route } from 'react-router-dom';


function PublicLayoutRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Grid columns={1}>
          <PublicHeader />
          <Component {...matchProps} />
        </Grid>
      )}
    />
  );
}

PublicLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicLayoutRoute;
