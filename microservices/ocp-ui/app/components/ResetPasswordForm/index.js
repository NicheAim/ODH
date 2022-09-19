/**
 *
 * ResetPasswordForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import Input, { InputLabel } from 'material-ui-next/Input';
import { FormControl } from 'material-ui-next/Form';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';


function ResetPasswordForm(props) {
  const { onResetPassword, onCloseDialog, user } = props;
  const passwordPattern = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@!#$]).*$');
  return (
    <Formik
      onSubmit={(values, actions) => {
        onResetPassword(values, actions);
      }}
      validationSchema={yup.object().shape({
        password: yup.string()
          .matches(passwordPattern, <FormattedMessage {...messages.validation.passwordPattern} />)
          .required((<FormattedMessage {...messages.validation.required} />)),
        confirmPassword: yup.string()
          .oneOf([yup.ref('password')], <FormattedMessage {...messages.validation.notMatch} />)
          .required((<FormattedMessage {...messages.validation.required} />)),
      })}
      render={(resetPasswordFormProps) => {
        const { isSubmitting, dirty, isValid } = resetPasswordFormProps;
        return (
          <Form>
            <Grid columns={1}>
              <Cell>
                <FormControl fullWidth disabled>
                  <InputLabel><FormattedMessage {...messages.userFullNameLabel} /></InputLabel>
                  <Input value={`${user.givenName} ${user.familyName}`} />
                </FormControl>
              </Cell>
              <Cell>
                <TextField
                  name="password"
                  type="password"
                  hintText={<FormattedMessage {...messages.hintText.newPassword} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.newPassword} />}
                  fullWidth
                />
              </Cell>
              <Cell>
                <TextField
                  name="confirmPassword"
                  type="password"
                  hintText={<FormattedMessage {...messages.hintText.confirmPassword} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.confirmPassword} />}
                  fullWidth
                />
              </Cell>
              <Cell>
                <Grid columns={2}>
                  <StyledRaisedButton
                    type="submit"
                    fullWidth
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    <FormattedMessage {...messages.submitButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton fullWidth onClick={onCloseDialog}>
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

ResetPasswordForm.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    givenName: PropTypes.string.isRequired,
    familyName: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResetPasswordForm;
