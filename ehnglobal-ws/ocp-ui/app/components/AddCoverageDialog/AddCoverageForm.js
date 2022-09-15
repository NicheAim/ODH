import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import { Form, Formik } from 'formik';
import find from 'lodash/find';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import yup from 'yup';
import messages from './messages';

function AddCoverageForm(props) {
  const {
    policyHolderRelationship,
    coverageFmStatus,
    coverageType,
    handleDialogClose,
    handleSaveCoverage,
    subscriptionOptions,
    patient,
    composePatientReference,
    getPatientFullName,
  } = props;
  const today = new Date();

  function setInitialValues() {
    return {
      beneficiary: getPatientFullName(patient),
    };
  }
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          const subscriberReference = find(subscriptionOptions, {
            reference: values.subscriber,
          });
          const {
            startDate,
            endDate,
            type,
            status,
            subscriberId,
            relationship,
            groupingPlanDisplay,
            network,
          } = values;
          const coverageData = {
            subscriber: subscriberReference,
            beneficiary: composePatientReference(patient),
            startDate: startDate && startDate.toLocaleDateString(),
            endDate: endDate && endDate.toLocaleDateString(),
            type,
            status,
            groupingPlanDisplay,
            network,
            subscriberId,
            relationship,
          };
          handleSaveCoverage(coverageData, actions);
        }}
        initialValues={setInitialValues(patient)}
        validationSchema={() =>
          yup.lazy((values) => {
            return yup.object().shape({
              beneficiary: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              subscriber: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              relationship: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              subscriberId: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              status: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              type: yup
                .string()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              startDate: yup
                .date()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              endDate: yup
                .date()
                .required(
                  <FormattedMessage {...messages.validation.required} />
                )
                .when(
                  'startDate',
                  (startDate, schema) => {
                    return startDate && schema.min(startDate);
                  },
                  <FormattedMessage {...messages.validation.minEndDate} />
                ),
            });
          })
        }
        render={({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <TextField
                  fullWidth
                  disabled
                  name="beneficiary"
                  hintText={
                    <FormattedMessage {...messages.hintText.beneficiary} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.beneficiary}
                    />
                  }
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="subscriber"
                  hintText={
                    <FormattedMessage {...messages.hintText.subscriber} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.subscriber}
                    />
                  }
                >
                  {subscriptionOptions &&
                    subscriptionOptions.map((entry) => (
                      <MenuItem
                        key={entry.reference}
                        value={entry.reference}
                        primaryText={entry.display}
                      />
                    ))}
                </SelectField>
              </Cell>

              <Cell>
                <SelectField
                  fullWidth
                  name="relationship"
                  hintText={
                    <FormattedMessage {...messages.hintText.relationship} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.relationship}
                    />
                  }
                >
                  {policyHolderRelationship &&
                    policyHolderRelationship.map((entry) => (
                      <MenuItem
                        key={entry.code}
                        value={entry.code}
                        primaryText={entry.display}
                      />
                    ))}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="subscriberId"
                  hintText={
                    <FormattedMessage {...messages.hintText.subscriberId} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.subscriberId}
                    />
                  }
                />
              </Cell>

              <Cell>
                <SelectField
                  fullWidth
                  name="status"
                  hintText={<FormattedMessage {...messages.hintText.status} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.status} />
                  }
                >
                  {coverageFmStatus &&
                    coverageFmStatus.map((status) => (
                      <MenuItem
                        key={status.code}
                        value={status.code}
                        primaryText={status.display}
                      />
                    ))}
                </SelectField>
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="type"
                  hintText={
                    <FormattedMessage {...messages.hintText.coverageType} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.coverageType}
                    />
                  }
                >
                  {coverageType &&
                    coverageType.map((type) => (
                      <MenuItem
                        key={type.code}
                        value={type.code}
                        primaryText={type.display}
                      />
                    ))}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="groupingPlanDisplay"
                  hintText={<FormattedMessage {...messages.hintText.copay} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.copay} />
                  }
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="network"
                  hintText={<FormattedMessage {...messages.hintText.network} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.network} />
                  }
                />
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="startDate"
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
              <Cell>
                <DatePicker
                  fullWidth
                  name="endDate"
                  minDate={today}
                  disabled={!values.startDate}
                  mode="landscape"
                  hintText={<FormattedMessage {...messages.hintText.endDate} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.endDate} />
                  }
                />
              </Cell>

              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
                <StyledFlatButton type="reset" onClick={handleDialogClose}>
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

AddCoverageForm.propTypes = {
  policyHolderRelationship: PropTypes.array.isRequired,
  coverageFmStatus: PropTypes.array.isRequired,
  subscriptionOptions: PropTypes.array.isRequired,
  coverageType: PropTypes.array.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleSaveCoverage: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  composePatientReference: PropTypes.func.isRequired,
  getPatientFullName: PropTypes.func.isRequired,
};

export default AddCoverageForm;
