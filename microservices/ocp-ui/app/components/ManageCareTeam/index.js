/**
 *
 * ManageCareTeam
 *
 */

import { TEXT_MIN_LENGTH } from 'containers/App/constants';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Util from 'utils/Util';
import yup from 'yup';
import ManageCareTeamForm from './ManageCareTeamForm';
import messages from './messages';

function ManageCareTeam(props) {
  const {
    patient,
    careTeam,
    editMode,
    careTeamCategories,
    careTeamReasons,
    careTeamStatuses,
    handleOpen,
    onSave,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
    episodeOfCares,
  } = props;
  const minimumLength = TEXT_MIN_LENGTH;
  const propsFromContainer = {
    patient,
    editMode,
    careTeamCategories,
    careTeamReasons,
    careTeamStatuses,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
    episodeOfCares,
  };

  return (
    <div>
      {patient && (
        <div>
          {((editMode && careTeam) || !editMode) && (
            <Formik
              isInitialValid={editMode}
              initialValues={setFormData(careTeam)}
              onSubmit={(values, actions) => {
                onSave(values, actions);
              }}
              validationSchema={() =>
                yup.lazy((values) => {
                  let startDate = new Date();
                  if (values.startDate) {
                    startDate = values.startDate;
                  }
                  return yup.object().shape({
                    careTeamName: yup
                      .string()
                      .required(
                        <FormattedMessage {...messages.validation.required} />
                      )
                      .min(
                        minimumLength,
                        <FormattedMessage
                          {...messages.validation.minLength}
                          values={{ minimumLength }}
                        />
                      ),
                    category: yup
                      .string()
                      .required(
                        <FormattedMessage {...messages.validation.required} />
                      ),
                    status: yup.string(),
                    startDate: yup
                      .date()
                      .required(
                        <FormattedMessage {...messages.validation.required} />
                      )
                      .min(
                        new Date(new Date().setDate(new Date().getDate() - 1)),
                        <FormattedMessage
                          {...messages.validation.minStartDate}
                        />
                      ),
                    endDate: yup
                      .date()
                      .min(
                        startDate,
                        <FormattedMessage {...messages.validation.minEndDate} />
                      ),
                  });
                })
              }
              render={(formikProps) => (
                <ManageCareTeamForm {...formikProps} {...propsFromContainer} />
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}

ManageCareTeam.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  careTeam: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  careTeamCategories: PropTypes.array.isRequired,
  careTeamReasons: PropTypes.array.isRequired,
  careTeamStatuses: PropTypes.array.isRequired,
  selectedParticipants: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
  episodeOfCares: PropTypes.array,
};

function setFormData(careTeam) {
  let formData = null;
  if (!isEmpty(careTeam)) {
    formData = {
      careTeamName: careTeam.name,
      category: careTeam.categoryCode,
      status: careTeam.statusCode,
      startDate: careTeam.startDate && new Date(careTeam.startDate),
      endDate: careTeam.endDate && new Date(careTeam.endDate),
      reason: careTeam.reasonCode,
      episodeOfCareCode: careTeam.episodeOfCareCode,
    };
  }
  return Util.pickByIdentity(formData);
}

export default ManageCareTeam;
