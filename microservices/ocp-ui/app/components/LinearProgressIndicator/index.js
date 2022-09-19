/**
 *
 * LinearProgressIndicator
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui-next/Progress';


function LinearProgressIndicator(props) {
  return (
    props.loading && <LinearProgress />
  );
}

LinearProgressIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LinearProgressIndicator;
