/**
 *
 * ManageAppointment
 *
 */

import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';

import Util from 'utils/Util';
import ManageAppointmentForm from './ManageAppointmentForm';
import { convertDateTimeArrayToTime, mapToEditParticipants, setAppointmentTime } from './helpers';
import messages from './messages';


function ManageAppointment(props) {
  const {
    patient,
    appointment,
    editMode,
    appointmentStatuses,
    appointmentTypes,
    onSave,
    appointmentParticipantRequired,
  } = props;
  const propsFromContainer = {
    patient,
    editMode,
    appointmentStatuses,
    appointmentTypes,
    appointmentParticipantRequired,
  };

  function setFormData() {
    let formData = null;
    if (!isEmpty(appointment)) {
      const { creatorRequired, description, typeCode, appointmentDate, statusCode, start, end, participant } = appointment;
      formData = {
        creatorRequired,
        selectedPatient: patient,
        description,
        appointmentType: typeCode,
        date: appointmentDate && new Date(appointmentDate),
        status: statusCode,
        startTime: convertDateTimeArrayToTime(start),
        endTime: convertDateTimeArrayToTime(end),
        appointmentStatus: statusCode,
        participants: mapToEditParticipants(participant),
      };
    }
    return Util.pickByIdentity(formData);
  }

  return (
    <div>
      {patient &&
      <div>
        {((editMode && appointment) || !editMode) &&
        <Formik
          isInitialValid={editMode}
          initialValues={setFormData(appointment)}
          onSubmit={(values, actions) => {
            const startDateTime = setAppointmentTime(values.startTime, values.date);
            const endDateTime = setAppointmentTime(values.endTime, values.date);
            const newValues = { ...values };
            newValues.startTime = startDateTime;
            newValues.endTime = endDateTime;
            onSave(newValues, actions);
          }}
          validationSchema={yup.object().shape({
            date: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
            appointmentType: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            creatorRequired: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            startTime: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            endTime: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            description: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            participants: yup.string()
              .required((<FormattedMessage {...messages.noParticipantAdded} />)),
          })
          }
          render={(formikProps) => <ManageAppointmentForm {...formikProps} {...propsFromContainer} />}
        />
        }
      </div>
      }
    </div>
  );
}

ManageAppointment.propTypes = {
  onSave: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  appointment: PropTypes.shape({
    creatorRequired: PropTypes.string,
    description: PropTypes.string,
    typeCode: PropTypes.string,
    appointmentDate: PropTypes.string,
    statusCode: PropTypes.string,
    start: PropTypes.array,
    end: PropTypes.array,
  }),
  appointmentStatuses: PropTypes.array.isRequired,
  appointmentTypes: PropTypes.array.isRequired,
  appointmentParticipantRequired: PropTypes.array,
};

export default ManageAppointment;
