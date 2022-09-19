import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import join from 'lodash/join';
import merge from 'lodash/merge';

import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import FileInputComponentField from 'components/FileInputComponentField';
import TextField from 'components/TextField';
import messages from './messages';
import { SMART_APP_LOGO_SRC_PREFIX, CLIENT_TYPE_CONFIDENTIAL, CLIENT_TYPE_PUBLIC } from './constants';

function ManageClientForm(props) {
  /* const imageFormat = new RegExp('(/(gif|jpg|jpeg|tiff|png)$/i)');
  const imageSize = 500;*/
  const {
    initialValues,
    handleCloseDialog,
    onSaveClient,
  } = props;
  let initialValueClient = null;
  let initialAppIcon = [];
  let defaultImage = [];
  if (initialValues !== null) {
    const { clientId, clientType, defaultClientScopes, name, redirectUris, appLaunchUrl, appIcon } = initialValues;
    if (appIcon !== '' && appIcon !== undefined) {
      initialAppIcon = [{
        base64: `${SMART_APP_LOGO_SRC_PREFIX}${appIcon}`,
        name: 'default.png',
        type: 'image/png',
      }];
      defaultImage = [`${SMART_APP_LOGO_SRC_PREFIX}${appIcon}`];
    }
    initialValueClient = {
      clientId,
      clientType,
      defaultClientScopes: join(defaultClientScopes, ','),
      name,
      redirectUris: join(redirectUris, ','),
      appLaunchUrl,
      appIcon: initialAppIcon,
      clientSecret: '************',
    };
  }
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          if (initialValues !== null) {
            onSaveClient(merge(values, { isEdit: true }), actions);
          }
          onSaveClient(values, actions);
          handleCloseDialog();
        }}
        initialValues={{ ...initialValueClient }}
        validationSchema={yup.object().shape({
          clientId: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          clientType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          defaultClientScopes: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          redirectUris: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          appLaunchUrl: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          clientSecret: yup.string()
            .when('clientType', {
              is: CLIENT_TYPE_CONFIDENTIAL,
              then: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            }),
          // TODO: Fix validation
          /* appIcon: yup.array().of(yup.object().shape({
            size: yup.number()
              .lessThan(imageSize, (<FormattedMessage {...messages.validation.imageSize} values={{ imageSize }} />)),
            name: yup.string()
              .matches(imageFormat, (<FormattedMessage {...messages.validation.imageFormat} />)),
          })),*/
        })}
        render={({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <Grid columns="1">
              <Cell>
                <SelectField
                  fullWidth
                  name="clientType"
                  disabled={initialValueClient !== null}
                  hintText={<FormattedMessage {...messages.hintText.clientType} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.clientType} />}
                >
                  <MenuItem value={CLIENT_TYPE_PUBLIC} primaryText={CLIENT_TYPE_PUBLIC} />
                  <MenuItem value={CLIENT_TYPE_CONFIDENTIAL} primaryText={CLIENT_TYPE_CONFIDENTIAL} />
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="clientId"
                  disabled={initialValueClient !== null}
                  hintText={<FormattedMessage {...messages.hintText.clientId} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.clientId} />}
                />
              </Cell>
              { values.clientType === CLIENT_TYPE_CONFIDENTIAL && <Cell>
                <TextField
                  fullWidth
                  name="clientSecret"
                  disabled={initialValueClient !== null}
                  hintText={<FormattedMessage {...messages.hintText.clientSecret} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.clientSecret} />}
                />
              </Cell>
              }
              <Cell>
                <TextField
                  fullWidth
                  name="name"
                  hintText={<FormattedMessage {...messages.hintText.name} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.name} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="appLaunchUrl"
                  hintText={<FormattedMessage {...messages.hintText.appLaunchUrl} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appLaunchUrl} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="redirectUris"
                  hintText={<FormattedMessage {...messages.hintText.redirectUri} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.redirectUri} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="defaultClientScopes"
                  hintText={<FormattedMessage {...messages.hintText.scopes} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.scopes} />}
                />
              </Cell>
              <Cell>
                <FileInputComponentField
                  name="appIcon"
                  labelText="App Logo"
                  accept="image/*"
                  defaultFiles={defaultImage}
                  imageStyle={{ width: 150, height: 150 }}
                  buttonComponent={<StyledRaisedButton> Select Image </StyledRaisedButton>}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
                <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                  <FormattedMessage {...messages.cancelButton} />
                </StyledFlatButton>
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

ManageClientForm.propTypes = {
  initialValues: PropTypes.shape({
    clientId: PropTypes.string,
    clientType: PropTypes.string,
  }),
  handleCloseDialog: PropTypes.func.isRequired,
  onSaveClient: PropTypes.func.isRequired,
};

export default ManageClientForm;

