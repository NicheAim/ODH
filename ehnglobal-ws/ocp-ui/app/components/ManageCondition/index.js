/**
 *
 * ManageCondition
 *
 */
import has from 'lodash/has';
import { Formik } from 'formik';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Util from 'utils/Util';
import * as yup from 'yup';
import { TEXT_MIN_LENGTH } from './constants';
import ManageConditionForm from './ManageConditionForm';
import messages from './messages';

function ManageCondition(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const {
    onSave,
    conditionsPatient,
    uspsStates,
    patient,
    editMode,
    selectedCondition,
  } = props;
  const ManageConditionFormProps = {
    onSave,
    conditionsPatient,
    uspsStates,
    patient,
  };
  return (
    <div>
      {((editMode && selectedCondition) || !editMode) && (
        <Formik
          initialValues={setInitialValues(selectedCondition)}
          onSubmit={(values, actions) => {
            const condition = mapToCondition(
              values,
              patient,
              conditionsPatient
            );
            onSave(condition, actions);
          }}
          validationSchema={() =>
            yup.lazy((values) => {
              return yup.object().shape({
                conditionCode: yup
                  .string()
                  .required(
                    <FormattedMessage {...messages.validation.required} />
                  ),
                diagnosisPriorityCode: yup
                  .string()
                  .required(
                    <FormattedMessage {...messages.validation.required} />
                  ),
                recordedDate: yup.date().required(
                  <FormattedMessage {...messages.validation.required} />
                ),
              });
            })
          }
          render={(formikProps) => (
            <ManageConditionForm
              {...formikProps}
              {...ManageConditionFormProps}
            />
          )}
        />
      )}
    </div>
  );
}

ManageCondition.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  conditionsPatient: PropTypes.array.isRequired,
  patient: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  selectedCondition: PropTypes.object,
};

export default ManageCondition;

function mapToCondition(capturedFormData, patient, conditionsPatient) {
  const { recordedDate, conditionCode, diagnosisPriorityCode } =
    capturedFormData;
  // let genderValue = '';
  // if (!isUndefined(genderCode)) {
  //   const selectedAdministrativeGenders = find(administrativeGenders, {
  //     code: genderCode,
  //   });
  //   genderValue = selectedAdministrativeGenders.display;
  // }

  const selectedConditions = find(conditionsPatient, {
    code: conditionCode,
  });

  const conditionValue = selectedConditions.display;
  const conditionSystem = selectedConditions.system;

  return {
    conditioncode: conditionCode,
    conditionValue,
    conditionSystem,
    patientid: patient.id,
    priority: diagnosisPriorityCode,
    recordedDate: !isUndefined(recordedDate)
      ? moment(recordedDate).format('DD/MM/YYYY')
      : null,
  };
}

function setInitialValues(selectedCondition) {
  console.log('selectedCondition');
  console.log(selectedCondition);
  // let initialValues = null;
  let initialValues = {
    recordedDate: null,
    conditionCode: null,
    diagnosisPriorityCode: null,
  };
  if (!isEmpty(selectedCondition)) {
    // initialValues = merge(
    //   // mapConditionToFormFields(selectedCondition, 'conditionCode'),
    //   mapConditionToDate(selectedCondition, 'recordedDate')
    //   // mapConditionToFormFields(selectedCondition, 'diagnosisPriorityCode')
    // );

    if (has(selectedCondition, 'recordedDate')) {
      if (selectedCondition.recordedDate != null) {
        initialValues.recordedDate = new Date(selectedCondition.recordedDate);
      } else {
      }
    }

    if (has(selectedCondition, 'code')) {
      if (has(selectedCondition.code, 'coding')) {
        if (selectedCondition.code.coding.length > 0) {
          initialValues.conditionCode = selectedCondition.code.coding[0].code;
        }
      }
    }

    if (has(selectedCondition, 'category')) {
      console.log('has category');
      if (
        Array.isArray(selectedCondition.category) &&
        selectedCondition.category.length > 0
      ) {
        console.log('has category length');
        if (has(selectedCondition.category[0], 'coding')) {
          console.log('has category coding');
          if (selectedCondition.category[0].coding.length > 0) {
            console.log('has category coding length');
            if (has(selectedCondition.category[0].coding[0], 'code')) {
              console.log('has category coding code');
              initialValues.diagnosisPriorityCode =
                selectedCondition.category[0].coding[0].code;
            }
          }
        }
      }
    }
  }

  return Util.pickByIdentity(initialValues);
}

function mapConditionToFormFields(selectedCondition, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedCondition[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(
      selectedCondition[fieldName]
    );
  }
  return fieldObject;
}

function mapConditionToDate(selectedCondition, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedCondition[fieldName])) {
    fieldObject[fieldName] =
      Util.setEmptyStringWhenUndefined(selectedCondition[fieldName]) &&
      selectedCondition[fieldName] &&
      new Date(selectedCondition[fieldName]);
  }
  return fieldObject;
}
