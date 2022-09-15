import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import ArrowFowardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import StyledIconButton from 'components/StyledIconButton';
import { Cell, Grid } from 'styled-css-grid';
import StyledListItem from './StyledListItem';
import StyledList from './StyledList';
import PermissionAddButtonsSection from './PermissionAddButtonsSection';
let selectScope;
let updateAddedScopes;
let updateScopes;
class PermissionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedScopes: [],
      scopes: this.props.scopes,
    };
    this.addAddedPermission = this.addAddedPermission.bind(this);
    this.removeAddedPermission = this.removeAddedPermission.bind(this);
  }

  addAddedPermission() {
    updateAddedScopes = this.state.addedScopes;
    updateAddedScopes.push(selectScope);
    updateScopes = this.state.scopes;
    updateScopes = updateScopes.filter((key) => key.id !== selectScope.id);
    this.setState(
      { addedScopes: updateAddedScopes,
        scopes: updateScopes,
      });
  }

  removeAddedPermission() {
    updateScopes = this.state.scopes;
    updateScopes.push(selectScope);
    updateAddedScopes = this.state.addedScopes;
    updateAddedScopes = updateAddedScopes.filter((key) => key.id !== selectScope.id);
    this.setState(
      { addedScopes: updateAddedScopes,
        scopes: updateScopes,
      });
  }
  render() {
    return (
      <div>
        <Grid columns={5}>
          <Cell row={1} width={2}>
            <Subheader>Permissions</Subheader>
            <StyledList defaultValue={1}>
              {this.state.scopes && this.state.scopes.map((scope) => (
                <StyledListItem
                  key={scope.id}
                  primaryText={scope.description}
                  onClick={() => {
                    selectScope = scope;
                  }}
                />))
              }
            </StyledList>
          </Cell>
          <Cell row={1} width={1}>
            <PermissionAddButtonsSection>
              <Grid columns={1}>
                <StyledIconButton svgIconSize="large" onClick={this.addAddedPermission}>
                  <ArrowFowardIcon />
                </StyledIconButton>
                <StyledIconButton svgIconSize="large" onClick={this.removeAddedPermission}>
                  <ArrowBackIcon />
                </StyledIconButton>
              </Grid>
            </PermissionAddButtonsSection>
          </Cell>
          <Cell row={1} width={2}>
            <Subheader>Added Permissions</Subheader>
            <StyledList defaultValue={1}>
              {this.state.addedScopes && this.state.addedScopes.map((scope) => (
                <StyledListItem
                  key={scope.id}
                  primaryText={scope.description}
                  onClick={() => {
                    selectScope = scope;
                  }}
                />))
              }
            </StyledList>
          </Cell>
        </Grid>
      </div>
    );
  }
}

PermissionsList.propTypes = {
  scopes: PropTypes.array,
};

export default PermissionsList;
