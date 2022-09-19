import React from 'react';
import PropTypes from 'prop-types';

import yup from 'yup';
import { Formik } from 'formik';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ManageObservationForm from './ManageObservationForm';
import get from 'lodash/get';
import moment from 'moment';

function ManageObservation(props) {

  const {
    onSave,
    user,
    patient,
    organization,
    medicalComplexities,
    socialComplexities,
    serviceIntegrationLevels,
    codeSystems,
    observation,
  } = props;

  const formData = {
    user,
    patient,
    organization,
    medicalComplexities,
    socialComplexities,
    serviceIntegrationLevels,
    codeSystems,
    observation,
  }

  const today = new Date();

  return (
    <div>
      <Formik
        initialValues={{
          ...(
            observation
              ? {
                observationCode: get(observation, 'code.coding[0].display'),
                observationStatus: get(observation, 'status'),
                observationValue: (
                  get(observation, 'valueCodeableConcept.coding[0].code')
                  || String(get(observation, 'valueInteger'))
                ),
                observationIssued: (get(observation, 'issued') &&  moment(get(observation, 'issued')).toDate()) || moment().toDate(),
              }
              : {
                observationIssued: today,
              }
          ),
        }}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        enableReinitialize
        validationSchema={() =>
          yup.lazy((values) => {
            const yesterday = moment(today).add(-1, 'days').toDate();
            return yup.object().shape({
              observationIssued: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(yesterday, (<FormattedMessage {...messages.validation.minIssuedDate} />)),
              observationCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              observationValue: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .matches(/[0-9]+/, { excludeEmptyString: true }),
            })
          })
        }
        render={(formikProps) => <ManageObservationForm {...formikProps} {...formData} />}
      />
    </div>
  )
}

ManageObservation.propTypes = {
  user: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  medicalComplexities: PropTypes.object,
  socialComplexities: PropTypes.object,
  serviceIntegrationLevels: PropTypes.object,
  codeSystems: PropTypes.object.isRequired,
  observation: PropTypes.object,
  onSave: PropTypes.func.isRequired,
}

export default ManageObservation;
