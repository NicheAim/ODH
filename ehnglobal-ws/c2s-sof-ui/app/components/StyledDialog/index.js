/**
 *
 * StyledDialog
 *
 */

import React from 'react';
import styled from 'styled-components';
import Dialog from 'material-ui-next/Dialog';

const StyledDialog = styled(({ ...other }) => (
  <Dialog {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    border: 3px solid #099;
    border-radius: 15px;
  }
`;

StyledDialog.propTypes = {};

export default StyledDialog;
