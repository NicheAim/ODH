import Checkbox from 'components/Checkbox';
import FormCell from 'components/FormCell';
import FormGrid from 'components/FormGrid';
import GoBackButton from 'components/GoBackButton';
import Padding from 'components/Padding/index';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import { Form } from 'formik';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import messages from './messages';


function ManageCommunicationForm(props) {
  const {
    isSubmitting,
    values,
    dirty,
    isValid,
    communicationStatus,
    communicationNotDoneReasons,
    communicationMedia,
    selectedPatient,
  } = props;

  const notDoneFlag = values.notDone;

  function getPatientName(patient) {
    let patientName = '';
    if (patient && patient.name && patient.name.length > 0) {
      const name = patient.name[0];
      patientName = (name && name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
    }
    return patientName;
  }

  return (
    <Form>
      <FormGrid columns={12}>
        <FormCell top={1} left={1} width={2}>
          <span>Patient: </span> {getPatientName(selectedPatient)}
        </FormCell>
        <FormCell top={2} left={1} width={4}>
          <Grid columns="2fr 2fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.creator} />}
                fullWidth
                name="sender"
                disabled
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={3} left={1} width={7}>
          <Grid columns="2fr 2fr 3fr" gap="">
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.status} />}
                name="statusCode"
                fullWidth
              >
                {communicationStatus && communicationStatus.map((status) => (
                  <MenuItem key={uniqueId()} value={status.code} primaryText={status.display} />
                ))}
              </SelectField>
            </Cell>
            {/* <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.topic} />}
                fullWidth
                name="topic"
                disabled
              />
            </Cell> */}
            {/* <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.context} />}
                fullWidth
                name="episodeOfCareCode"
              />
            </Cell> */}
          </Grid>
        </FormCell>
        <FormCell top={4} left={1} width={6}>
          <Grid columns="3fr 3fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.subject} />}
                fullWidth
                name="subject"
                disabled
              />
            </Cell>
            <Cell>
              <SelectField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.medium} />}
                name="mediumCode"
                fullWidth
              >
                {communicationMedia && communicationMedia.map((communicationMedium) => (
                  <MenuItem key={uniqueId()} value={communicationMedium.code} primaryText={communicationMedium.display} />
                ))}
              </SelectField>
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={5} left={1} width={6}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.payloadContent} />}
            fullWidth
            name="payloadContent"
            multiLine
            rows={2}
            rowsMax={8}
          />
        </FormCell>
        <FormCell top={6} left={1} width={4}>
          <Grid columns="2fr 2fr" gap="">
            <Cell>
              <TextField
                floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.duration} />}
                fullWidth
                name="duration"
              />
            </Cell>
          </Grid>
        </FormCell>
        <FormCell top={7} left={1} width={6}>
          <TextField
            floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.note} />}
            fullWidth
            name="note"
            multiLine
            rows={2}
            rowsMax={8}
          />
        </FormCell>
        <FormCell top={8} left={1} width={6}>
          <Grid columns="3fr 3fr" gap="">
            <Cell>
              <Padding top={35}>
                <Checkbox
                  name="notDone"
                  label={<FormattedMessage {...messages.form.floatingLabelText.notDone} />}
                >
                </Checkbox>
              </Padding>
            </Cell>
            <SelectField
              floatingLabelText={<FormattedMessage {...messages.form.floatingLabelText.notDoneReason} />}
              name="notDoneReasonCode"
              disabled={!notDoneFlag}
              fullWidth
            >
              {communicationNotDoneReasons && communicationNotDoneReasons.map((communicationNotDoneReason) => (
                <MenuItem key={uniqueId()} value={communicationNotDoneReason.code} primaryText={communicationNotDoneReason.display} />
              ))}
            </SelectField>
          </Grid>
        </FormCell>
        <FormCell top={9} left={1} width={2}>
          <Grid columns="1fr 1fr" gap="6vw">
            <Cell>
              <StyledRaisedButton
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                {isSubmitting ?
                  <FormattedMessage {...messages.form.savingButton} /> :
                  <FormattedMessage {...messages.form.saveButton} />}
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton
                label={<FormattedMessage {...messages.form.cancelButton} />}
                disabled={isSubmitting}
              />
            </Cell>
          </Grid>
        </FormCell>
      </FormGrid>
    </Form>
  );
}

ManageCommunicationForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  selectedPatient: PropTypes.object.isRequired,
};

export default ManageCommunicationForm;

