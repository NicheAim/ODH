import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import Util from 'utils/Util';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';

function AssignPermissionGroupsForm(props) {
  const {
    groups,
    organizations,
    initialValues,
    onAssignPermissionGroup,
    onRemovePermissionGroup,
    onCloseDialog,
  } = props;

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemovePermissionGroup(initialValues.index);
          }
          onAssignPermissionGroup(values);
          onCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).permissionGroup }}
        validationSchema={yup.object().shape({
          organization: yup.object()
            .required((<FormattedMessage {...messages.assignGroupsForm.validation.required} />)),
          group: yup.object()
            .required((<FormattedMessage {...messages.assignGroupsForm.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns={1}>
              <Cell>
                <SelectField
                  name="organization"
                  hintText={<FormattedMessage {...messages.assignGroupsForm.hintText.organization} />}
                  floatingLabelText={<FormattedMessage {...messages.assignGroupsForm.floatingLabelText.organization} />}
                  fullWidth
                >
                  {organizations &&
                  organizations.map((organization) => (
                    <MenuItem
                      key={organization.reference}
                      value={organization}
                      primaryText={organization.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <SelectField
                  name="group"
                  fullWidth
                  hintText={<FormattedMessage {...messages.assignGroupsForm.hintText.permissionGroup} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.assignGroupsForm.floatingLabelText.permissionGroup} />}
                >
                  {groups.map((group) => {
                    const displayName = group.displayName.split('.').pop();
                    return (
                      <MenuItem
                        key={group.id}
                        value={group}
                        primaryText={Util.deCamelize(displayName)}
                      />);
                  })}
                </SelectField>
              </Cell>
              <Cell>
                <Grid columns={2}>
                  <StyledRaisedButton
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid}
                    fullWidth
                  >
                    <FormattedMessage {...messages.assignGroupsForm.saveButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton type="reset" onClick={onCloseDialog} fullWidth>
                    <FormattedMessage {...messages.assignGroupsForm.cancelButton} />
                  </StyledFlatButton>
                </Grid>
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

AssignPermissionGroupsForm.propTypes = {
  onAssignPermissionGroup: PropTypes.func.isRequired,
  onRemovePermissionGroup: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    permissionGroup: PropTypes.object.isRequired,
  }),
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string,
    scopes: PropTypes.array.isRequired,
  })).isRequired,
  organizations: PropTypes.array.isRequired,
};

export default AssignPermissionGroupsForm;

