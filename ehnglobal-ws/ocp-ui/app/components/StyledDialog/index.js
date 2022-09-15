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
    border: 3px solid #3275c1;
    border-radius: 15px;
    height:80%;
  }
  & .paper div:nth-child(2){ height:100%; }
`;

StyledDialog.propTypes = {};

export default StyledDialog;
