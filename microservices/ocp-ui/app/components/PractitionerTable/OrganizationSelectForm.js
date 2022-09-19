/**
 *
 * OrganizationSelectForm
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import { MANAGE_USER_REGISTRATION } from 'containers/App/constants';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import SelectField from 'components/SelectField';
import messages from './messages';


function OrganizationSelectForm(props) {
  const { handleCloseDialog, practitioner } = props;
  return (
    <Formik
      onSubmit={() => {
      }}
      validationSchema={yup.object().shape({
        organization: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
      })}
      render={(organizationSelectFormProps) => {
        const { isSubmitting, dirty, isValid, values } = organizationSelectFormProps;
        return (
          <Form>
            <Grid columns={1}>
              <SelectField
                name="organization"
                hintText={<FormattedMessage {...messages.organization} />}
                floatingLabelText={<FormattedMessage {...messages.organization} />}
                fullWidth
              >
                {practitioner && practitioner.practitionerRoles && practitioner.practitionerRoles.map((practitionerRole) => (
                  <MenuItem
                    key={practitionerRole.organization.reference.split('/').pop()}
                    value={practitionerRole.organization.reference.split('/').pop()}
                    primaryText={practitionerRole.organization.display}
                  />),
                )}
              </SelectField>
              <Cell>
                <Grid columns={2}>
                  <StyledRaisedButton
                    type="submit"
                    fullWidth
                    disabled={!dirty || isSubmitting || !isValid}
                    component={Link}
                    to={`${MANAGE_USER_REGISTRATION}/${practitioner.logicalId}?resourceType=Practitioner&orgId=${values.organization}`}
                  >
                    <FormattedMessage {...messages.submitButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton fullWidth onClick={handleCloseDialog}>
                    <FormattedMessage {...messages.cancelButton} />
                  </StyledFlatButton>
                </Grid>
              </Cell>
            </Grid>
          </Form>
        );
      }}
    />
  );
}

OrganizationSelectForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  practitioner: PropTypes.object,
};

export default OrganizationSelectForm;
