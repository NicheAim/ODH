/**
 *
 * PublicLayoutRoute
 *
 */

import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import PublicHeader from 'components/PublicHeader';


function PublicLayoutRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Grid columns={1}>
          <Cell><PublicHeader /></Cell>
          <Cell><Component {...matchProps} /></Cell>
        </Grid>
      )}
    />
  );
}

PublicLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicLayoutRoute;
