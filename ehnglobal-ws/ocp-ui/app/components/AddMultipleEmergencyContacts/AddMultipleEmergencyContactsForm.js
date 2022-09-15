import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import { Form, Formik } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import yup from 'yup';
import DatePicker from '../../components/DatePicker';
import FieldGroupGrid from '../../components/FieldGroupGrid';
import MainCell from '../../components/FieldGroupGrid/MainCell';
import PrefixCell from '../../components/FieldGroupGrid/PrefixCell';
import SelectField from '../../components/SelectField';
import { PHONE_PATTERN } from '../../containers/App/constants';
import { EMAIL_SYSTEM, PHONE_SYSTEM } from '../../utils/constants';
import { TEXT_MIN_LENGTH } from './constants';
import messages from './messages';

function AddEmergencyContactsForm(props) {
  const today = new Date();
  const phonePattern = new RegExp(PHONE_PATTERN);
  const {
    initialValues,
    onAddItem,
    onRemoveItem,
    handleCloseDialog,
    relationshipTypes,
    administrativeGenders,
    patientIdentifierSystems,
    telecomSystems,
    telecomUses,
  } = props;

  const minimumLength = TEXT_MIN_LENGTH;

  let startDate = new Date();

  if (initialValues && initialValues.startDate) {
    startDate = initialValues.startDate;
  }

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveItem(initialValues.index);
          }
          onAddItem(values);
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).currentItem }}
        validationSchema={yup.object().shape({
          firstName: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          lastName: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          relationshipCode: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          birthDate: yup.date(),
          genderCode: yup.string(),
          startDate: yup
            .date()
            .min(
              new Date(new Date().setDate(new Date().getDate() - 1)),
              <FormattedMessage {...messages.validation.minStartDate} />
            ),
          endDate: yup
            .date()
            .min(
              startDate,
              <FormattedMessage {...messages.validation.minEndDate} />
            ),
          identifierType: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          identifierValue: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />)
            .min(
              minimumLength,
              <FormattedMessage
                {...messages.validation.minLength}
                values={{ minimumLength }}
              />
            ),
          system: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          value: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />)
            .when('system', {
              is: EMAIL_SYSTEM, // alternatively: (val) => val == true
              then: yup.string().email(),
              otherwise: null,
            })
            .when('system', {
              is: PHONE_SYSTEM, // alternatively: (val) => val == true
              then: yup
                .string()
                .matches(
                  phonePattern,
                  <FormattedMessage {...messages.validation.phone} />
                ),
              otherwise: null,
            }),
          use: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns={12}>
              <Cell width={6}>
                <TextField
                  name="firstName"
                  hintText={
                    <FormattedMessage {...messages.hintText.firstName} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.firstName}
                    />
                  }
                  fullWidth
                />
              </Cell>

              <Cell width={6}>
                <TextField
                  name="lastName"
                  hintText={
                    <FormattedMessage {...messages.hintText.lastName} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.lastName}
                    />
                  }
                  fullWidth
                />
              </Cell>

              <Cell width={6}>
                <SelectField
                  fullWidth
                  name="relationshipCode"
                  hintText={
                    <FormattedMessage {...messages.hintText.identifierType} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.relationshipType}
                    />
                  }
                >
                  {relationshipTypes &&
                    relationshipTypes
                      .reverse()
                      .filter(
                        (relationshipType) =>
                          relationshipType.code === 'C' ||
                          relationshipType.display === 'Emergency Contact'
                      )
                      .map((relationshipType) => (
                        <MenuItem
                          key={relationshipType.code}
                          value={relationshipType.code}
                          primaryText={relationshipType.display}
                        />
                      ))}
                </SelectField>
              </Cell>

              <Cell width={6}>
                <DatePicker
                  fullWidth
                  name="birthDate"
                  maxDate={new Date()}
                  hintText={<FormattedMessage {...messages.hintText.dob} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.dob} />
                  }
                />
              </Cell>

              <Cell width={6}>
                <SelectField
                  fullWidth
                  name="genderCode"
                  hintText={<FormattedMessage {...messages.hintText.gender} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.gender} />
                  }
                >
                  {administrativeGenders &&
                    administrativeGenders.map((genderType) => (
                      <MenuItem
                        key={genderType.code}
                        value={genderType.code}
                        primaryText={genderType.display}
                      />
                    ))}
                </SelectField>
              </Cell>

              <Cell width={6}>
                <DatePicker
                  fullWidth
                  name="startDate"
                  minDate={today}
                  mode="landscape"
                  hintText={
                    <FormattedMessage {...messages.hintText.startDate} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.startDate}
                    />
                  }
                />
              </Cell>

              <Cell width={6}>
                <DatePicker
                  fullWidth
                  name="endDate"
                  minDate={today}
                  mode="landscape"
                  hintText={<FormattedMessage {...messages.hintText.endDate} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.endDate} />
                  }
                />
              </Cell>

              <Cell width={12}>
                <FieldGroupGrid>
                  <PrefixCell>
                    <SelectField
                      fullWidth
                      name="identifierType"
                      hintText={
                        <FormattedMessage
                          {...messages.hintText.identifierType}
                        />
                      }
                      floatingLabelText={
                        <FormattedMessage
                          {...messages.floatingLabelText.identifierType}
                        />
                      }
                    >
                      {patientIdentifierSystems &&
                        patientIdentifierSystems
                          .reverse()
                          .map((identifierType) => (
                            <MenuItem
                              key={identifierType.oid}
                              value={identifierType.uri}
                              primaryText={identifierType.display}
                            />
                          ))}
                    </SelectField>
                  </PrefixCell>
                  <MainCell>
                    <TextField
                      fullWidth
                      name="identifierValue"
                      hintText={
                        <FormattedMessage
                          {...messages.hintText.identifierValue}
                        />
                      }
                      floatingLabelText={
                        <FormattedMessage
                          {...messages.floatingLabelText.identifierValue}
                        />
                      }
                    />
                  </MainCell>
                </FieldGroupGrid>
              </Cell>

              <Cell width={8}>
                <FieldGroupGrid>
                  <PrefixCell>
                    <SelectField
                      name="system"
                      hintText={
                        <FormattedMessage {...messages.hintText.system} />
                      }
                      floatingLabelText={
                        <FormattedMessage
                          {...messages.floatingLabelText.system}
                        />
                      }
                      fullWidth
                    >
                      {telecomSystems &&
                        telecomSystems
                          .filter((item) => item.code === 'phone')
                          .map((telecomSystem) => (
                            <MenuItem
                              key={telecomSystem.code}
                              value={telecomSystem.code}
                              primaryText={telecomSystem.display}
                            />
                          ))}
                    </SelectField>
                  </PrefixCell>
                  <MainCell>
                    <TextField
                      name="value"
                      hintText={
                        <FormattedMessage {...messages.hintText.value} />
                      }
                      floatingLabelText={
                        <FormattedMessage
                          {...messages.floatingLabelText.value}
                        />
                      }
                      fullWidth
                    />
                  </MainCell>
                </FieldGroupGrid>
              </Cell>

              <Cell width={4}>
                <SelectField
                  name="use"
                  hintText={<FormattedMessage {...messages.hintText.use} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.use} />
                  }
                  fullWidth
                >
                  {telecomUses &&
                    telecomUses.map((telecomUse) => (
                      <MenuItem
                        key={telecomUse.code}
                        value={telecomUse.code}
                        primaryText={telecomUse.display}
                      />
                    ))}
                </SelectField>
              </Cell>

              {/*  
                  
                    <Cell area="identifierGroup">
                      
                    </Cell>
                    <Cell area="addresses">
                      <AddMultipleAddresses {...addAddressesProps} />
                    </Cell>
                    <Cell area="contacts">
                      <AddMultipleTelecoms {...addTelecomsProps} />
                      {hasPhoneContact() ? (
                        ''
                      ) : (
                        <ErrorText>
                          <FormattedMessage
                            {...messages.validation.phoneContact}
                          />
                        </ErrorText>
                      )}
                    </Cell> */}

              <Cell width={2}>
                <Grid columns={2}>
                  <StyledRaisedButton
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    <FormattedMessage {...messages.saveButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                    <FormattedMessage {...messages.cancelButton} />
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

AddEmergencyContactsForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    currentItem: PropTypes.object.isRequired,
  }),
  telecomSystems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ).isRequired,
  telecomUses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string,
      display: PropTypes.string,
      definition: PropTypes.string,
    })
  ).isRequired,
};

export default AddEmergencyContactsForm;
