/**
 *
 * AddAssociateOrganizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import teal from 'material-ui-next/colors/teal';
import Close from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';

import FormSubtitle from 'components/FormSubtitle';
import AddNewItemButton from 'components/PanelToolbar/AddNewItemButton';
import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledDialog from 'components/StyledDialog';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import AddPractitionerRole from './AddPractitionerRole';
import AddedOrganizationsTable from './AddedOrganizationsTable';
import messages from './messages';


class AddAssociateOrganizations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.props.initialSearchOrganizationResult();
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
    });
  }

  render() {
    const { onSearch, onChangePage, organizations, roleType, specialtyType, existingOrganizations, errors } = this.props;
    return (
      <div>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <AddNewItemButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color='#3275c1' />
          <FormattedMessage {...messages.addOrganizationButton} />
        </AddNewItemButton>
        <FieldArray
          name="practitionerRoles"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog maxWidth="md" fullWidth open={this.state.dialogOpen}>
                <DialogTitle>
                  <Grid columns="95% 5%">
                    <Cell>
                      <FormattedMessage {...messages.title} />
                    </Cell>
                    <Cell>
                      <StyledTooltip placement="left" title={<FormattedMessage {...messages.closeButton} />}>
                        <StyledIconButton size="x-small" onClick={this.handleCloseDialog}>
                          <Close />
                        </StyledIconButton>
                      </StyledTooltip>
                    </Cell>
                  </Grid>
                </DialogTitle>
                <DialogContent>
                  <AddPractitionerRole
                    onCloseDialog={this.handleCloseDialog}
                    onSearch={onSearch}
                    onChangePage={onChangePage}
                    onAddPractitionerRole={arrayHelpers.push}
                    organizations={organizations}
                    existingOrganizations={existingOrganizations}
                    roleType={roleType}
                    specialtyType={specialtyType}
                  />
                </DialogContent>
              </StyledDialog>
              <AddedOrganizationsTable
                roleType={roleType}
                specialtyType={specialtyType}
                errors={errors}
                practitionerRoles={existingOrganizations}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

AddAssociateOrganizations.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialSearchOrganizationResult: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
  }),
  existingOrganizations: PropTypes.array,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
  errors: PropTypes.object,
};

export default AddAssociateOrganizations;
