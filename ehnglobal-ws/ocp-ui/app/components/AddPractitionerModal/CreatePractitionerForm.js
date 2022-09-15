import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import CreatePractitionerFormGrid from './CreatePractitionerFormGrid';
import messages from './messages';


function CreatePractitionerForm(props) {
  const { identifierSystems, onCheckExisting } = props;

  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onCheckExisting(values, actions);
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifier: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <CreatePractitionerFormGrid>
              <Cell area="firstName">
                <TextField
                  fullWidth
                  name="firstName"
                  hintText={<FormattedMessage {...messages.hintText.firstName} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
                />
              </Cell>
              <Cell area="lastName">
                <TextField
                  fullWidth
                  name="lastName"
                  hintText={<FormattedMessage {...messages.hintText.lastName} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
                />
              </Cell>
              <Cell area="identifierGroup">
                <FieldGroupGrid>
                  <PrefixCell>
                    <SelectField
                      fullWidth
                      name="identifierType"
                      hintText={<FormattedMessage {...messages.hintText.identifierType} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
                    >
                      {identifierSystems && identifierSystems.map((identifierType) => (
                        <MenuItem
                          key={identifierType.uri}
                          value={identifierType.uri}
                          primaryText={identifierType.display}
                        />),
                      )}
                    </SelectField>
                  </PrefixCell>
                  <MainCell>
                    <TextField
                      fullWidth
                      name="identifier"
                      hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
                    />
                  </MainCell>
                </FieldGroupGrid>
              </Cell>
              <Cell area="button">
                <StyledRaisedButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
                  <FormattedMessage {...messages.checkExistingButton} />
                </StyledRaisedButton>
              </Cell>
            </CreatePractitionerFormGrid>
          </Form>
        )}
      />
    </div>
  );
}

CreatePractitionerForm.propTypes = {
  onCheckExisting: PropTypes.func.isRequired,
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
};

export default CreatePractitionerForm;

