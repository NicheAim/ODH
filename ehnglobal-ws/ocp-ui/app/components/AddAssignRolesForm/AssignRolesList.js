import React from 'react';
import Subheader from 'material-ui/Subheader';
import ArrowFowardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StyledIconButton from 'components/StyledIconButton';
import { Cell, Grid } from 'styled-css-grid';
import StyledListItem from './StyledListItem';
import StyledList from './StyledList';
import AddButtonsSection from './AddButtonsSection';

function AssignRolesList() {
  return (
    <div>
      <Grid columns={5}>
        <Cell row={1} width={2}>
          <Subheader>UnAssigned</Subheader>
          <StyledList defaultValue={1}>
            <StyledListItem
              value={1}
              primaryText="Administrator"
            />
            <StyledListItem
              value={2}
              primaryText="Care Manager"
            />
            <StyledListItem
              value={3}
              primaryText="Care Coordinator"
            />
          </StyledList>
        </Cell>
        <Cell row={1} width={1}>
          <AddButtonsSection>
            <Grid columns={1}>
              <StyledIconButton svgIconSize="large">
                <ArrowFowardIcon />
              </StyledIconButton>
              <StyledIconButton svgIconSize="large">
                <ArrowBackIcon />
              </StyledIconButton>
            </Grid>
          </AddButtonsSection>
        </Cell>
        <Cell row={1} width={2}>
          <Subheader>Assigned</Subheader>
          <StyledList defaultValue={1}>
          </StyledList>
        </Cell>
      </Grid>
    </div>
  );
}
AssignRolesList.propTypes = {};

export default AssignRolesList;
