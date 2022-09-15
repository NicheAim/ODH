/**
 *
 * ChangePasswordForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import Input, { InputLabel } from 'material-ui-next/Input';
import { FormControl } from 'material-ui-next/Form';

import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';


function ChangePasswordForm(props) {
  const { onChangePassword, onCloseDrawer, user } = props;
  const passwordPattern = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@!#$]).*$');
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onChangePassword(values, actions);
        }}
        validationSchema={yup.object().shape({
          oldPassword: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          password: yup.string()
            .notOneOf([yup.ref('oldPassword')], <FormattedMessage {...messages.validation.matchOldPassword} />)
            .matches(passwordPattern, <FormattedMessage {...messages.validation.passwordPattern} />)
            .required((<FormattedMessage {...messages.validation.required} />)),
          confirmPassword: yup.string()
            .oneOf([yup.ref('password')], <FormattedMessage {...messages.validation.notMatch} />)
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(changePasswordFormProps) => {
          const { isSubmitting, dirty, isValid } = changePasswordFormProps;
          return (
            <Form>
              <Grid columns={1}>
                <Cell>
                  <FormControl fullWidth disabled>
                    <InputLabel><FormattedMessage {...messages.usernameLabel} /></InputLabel>
                    <Input value={user.user_name} />
                  </FormControl>
                </Cell>
                <Cell>
                  <TextField
                    name="oldPassword"
                    type="password"
                    hintText={<FormattedMessage {...messages.hintText.oldPassword} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.oldPassword} />}
                    fullWidth
                  />
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
                      <FormattedMessage {...messages.saveButton} />
                    </StyledRaisedButton>
                    <StyledFlatButton fullWidth onClick={onCloseDrawer}>
                      <FormattedMessage {...messages.cancelButton} />
                    </StyledFlatButton>
                  </Grid>
                </Cell>
              </Grid>
            </Form>
          );
        }}
      />
    </div>
  );
}

ChangePasswordForm.propTypes = {
  onCloseDrawer: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChangePasswordForm;
