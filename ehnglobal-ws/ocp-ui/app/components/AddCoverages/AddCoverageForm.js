import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import merge from 'lodash/merge';
import find from 'lodash/find';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';


import { DATE_PICKER_MODE } from 'containers/App/constants';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import DatePicker from 'components/DatePicker';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import messages from './messages';
import moment from "moment";

function isDuplicate(initialValues) {
  if (initialValues !== null) {
    return false;
  }
  return false;
}

function AddCoverageForm(props) {
  const {
    initialValues,
    policyHolderRelationship,
    coverageType,
    handleCloseDialog,
    subscriptionOptions,
    coverageFmStatus,
    onRemoveCoverage,
    onAddCoverage,
    patient,
    composePatientReference,
    getPatientFullName,
  } = props;
  const today = new Date();

  function getDateFromDateTimeStr(dateStr) {
    return dateStr && dateStr.split(',')[0];
  }
  function getInitialValue() {
    let coverageObject = {};
    if (patient) {
      coverageObject = { coverage: { beneficiary: getPatientFullName(patient) } };
    }
    return { ...(initialValues || coverageObject).coverage };
  }
  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveCoverage(initialValues.index);
          }
          const { startDate, endDate, subscriber, type, groupingPlanDisplay, network } = values;
          const subscriberData = find(subscriptionOptions, { reference: subscriber });
          const typeData = find(coverageType, { code: type });
          const data = {
            startDate: startDate && moment(startDate).format('MM/DD/YYYY'),
            endDate: endDate && moment(endDate).format('MM/DD/YYYY'),
            subscriber: subscriberData,
            beneficiary: composePatientReference(patient),
            typeDisplay: typeData && typeData.display,
            groupingPlanDisplay,
            network,
          };
          onAddCoverage(merge(values, data));
          handleCloseDialog();
        }}
        initialValues={getInitialValue()}
        validationSchema={() =>
          yup.lazy((values) => {
            let startDate = new Date();

            if (values.startDate) {
              startDate = values.startDate;
            }
            return yup.object().shape({
              beneficiary: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              subscriber: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              relationship: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              subscriberId: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              type: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(today, (<FormattedMessage {...messages.validation.minStartDate} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(startDate, (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
          })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <TextField
                  fullWidth
                  name="beneficiary"
                  hintText={<FormattedMessage {...messages.hintText.beneficiary} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.beneficiary} />}
                  disabled
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="subscriber"
                  hintText={<FormattedMessage {...messages.hintText.subscriber} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.subscriber} />}
                >
                  {subscriptionOptions && subscriptionOptions.map((entry) =>
                    <MenuItem key={entry.reference} value={entry.reference} primaryText={entry.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="relationship"
                  hintText={<FormattedMessage {...messages.hintText.relationship} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.relationship} />}
                >
                  {policyHolderRelationship && policyHolderRelationship.map((entry) =>
                    <MenuItem key={entry.code} value={entry.code} primaryText={entry.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="subscriberId"
                  hintText={<FormattedMessage {...messages.hintText.subscriberId} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.subscriberId} />}
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="status"
                  hintText={<FormattedMessage {...messages.hintText.status} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
                >
                  {coverageFmStatus && coverageFmStatus.map((status) =>
                    <MenuItem key={status.code} value={status.code} primaryText={status.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell >
                <SelectField
                  fullWidth
                  name="type"
                  hintText={<FormattedMessage {...messages.hintText.coverageType} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.coverageType} />}
                >
                  {coverageType && coverageType.map((type) =>
                    <MenuItem key={type.code} value={type.code} primaryText={type.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="groupingPlanDisplay"
                  hintText={<FormattedMessage {...messages.hintText.copay} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.copay} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="network"
                  hintText={<FormattedMessage {...messages.hintText.network} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.network} />}
                />
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="startDate"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
                  defaultDate={today}
                  minDate={today}
                  hintText={<FormattedMessage {...messages.hintText.startDate} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
                />
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="endDate"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
                  minDate={today}
                  hintText={<FormattedMessage {...messages.hintText.endDate} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid || isDuplicate(initialValues)}
                >
                  <FormattedMessage {...messages.saveFlagButton} />
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

AddCoverageForm.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  composePatientReference: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number,
    flag: PropTypes.object,
  }),
  subscriptionOptions: PropTypes.array,
  coverageFmStatus: PropTypes.array,
  coverageType: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  onRemoveCoverage: PropTypes.func.isRequired,
  onAddCoverage: PropTypes.func.isRequired,
  getPatientFullName: PropTypes.func.isRequired,
  patient: PropTypes.object,
};

export default AddCoverageForm;

