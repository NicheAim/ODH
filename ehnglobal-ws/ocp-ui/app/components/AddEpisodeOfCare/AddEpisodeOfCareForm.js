import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import { DATE_PICKER_MODE } from 'containers/App/constants';
import CustomErrorText from 'components/CustomErrorText';
import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { checkDuplicateEOC, mapCareManager, setInitialValue } from './helpers';
import messages from './messages';

function AddEpisodeOfCareForm(props) {
  const {
    initialValues,
    onAddEpisodeOfCare,
    onRemoveEpisodeOfCare,
    handleCloseDialog,
    practitioners,
    episodeOfCareStatus,
    episodeOfCareType,
    episodeOfCares,
    editMode,
  } = props;
  const today = new Date();
  return (
    <div>
      <Formik
        initialValues={setInitialValue(initialValues)}
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveEpisodeOfCare(initialValues.index);
          }
          onAddEpisodeOfCare(mapCareManager(values, practitioners));
          handleCloseDialog();
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let defaultStartDate = new Date();
            if (values.startDate) {
              defaultStartDate = values.startDate;
            }
            console.log('addEspidofOfCareValidation')
            console.log('defaultStartDate',defaultStartDate)
            console.log('values',values)
            return yup.object().shape({
              type: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(defaultStartDate, (<FormattedMessage {...messages.validation.minEndDate} />)),
              careManager: yup.string().required((<FormattedMessage {...messages.validation.required} />)),
            });
          })}
        render={({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <SelectField
                  fullWidth
                  name={'status'}
                  hintText={<FormattedMessage {...messages.hintText.status} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
                >
                  {episodeOfCareStatus && episodeOfCareStatus.map((eocStatus) =>
                    (<MenuItem
                      key={eocStatus.code}
                      value={eocStatus.code}
                      primaryText={eocStatus.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell />
              <Cell>
                <SelectField
                  fullWidth
                  name={'type'}
                  hintText={<FormattedMessage {...messages.hintText.type} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.type} />}
                >
                  {episodeOfCareType && episodeOfCareType.map((eocType) =>
                    (<MenuItem
                      key={eocType.code}
                      value={eocType.code}
                      primaryText={eocType.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name={'careManager'}
                  hintText={<FormattedMessage {...messages.hintText.careManager} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careManager} />}
                >
                  {practitioners && practitioners.map((practitioner) =>
                    (<MenuItem
                      key={practitioner.reference}
                      value={practitioner.reference}
                      primaryText={practitioner.display}
                    />),
                  )}
                </SelectField>
              </Cell>
              <Cell>
                <DatePicker
                  fullWidth
                  name="startDate"
                  mode={DATE_PICKER_MODE.LANDSCAPE}
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
              <Cell width={2}>
                {checkDuplicateEOC(episodeOfCares, values, editMode) &&
                <CustomErrorText>
                  <FormattedMessage {...messages.validation.duplicateEOC} />
                </CustomErrorText>
                }
              </Cell>
              <Cell>
                <Grid columns={2}>
                  <StyledRaisedButton
                    type="submit"
                    fullWidth
                    disabled={!dirty || isSubmitting || !isValid || checkDuplicateEOC(episodeOfCares, values, editMode)}
                  >
                    <FormattedMessage {...messages.saveButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton fullWidth type="reset" onClick={handleCloseDialog}>
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

AddEpisodeOfCareForm.propTypes = {
  onAddEpisodeOfCare: PropTypes.func.isRequired,
  onRemoveEpisodeOfCare: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number,
    episodeOfCare: PropTypes.object,
  }),
  editMode: PropTypes.bool.isRequired,
  episodeOfCares: PropTypes.array,
  practitioners: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
  episodeOfCareType: PropTypes.array,
};

export default AddEpisodeOfCareForm;

