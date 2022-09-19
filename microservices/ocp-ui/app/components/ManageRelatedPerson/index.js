/**
 *
 * ManageRelatedPerson
 *
 */

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
import ManageRelatedPersonForm from './ManageRelatedPersonForm';
import messages from './messages';

function ManageRelatedPerson(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const {
    onSave,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomUses,
    telecomSystems,
    relationshipTypes,
    patient,
    editMode,
    selectedRelatedPerson,
  } = props;
  const manageRelatedPersonFormProps = {
    onSave,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomSystems,
    telecomUses,
    relationshipTypes,
    patient,
  };
  return (
    <div>
      {((editMode && selectedRelatedPerson) || !editMode) && (
        <Formik
          initialValues={setInitialValues(selectedRelatedPerson)}
          onSubmit={(values, actions) => {
            const relatedPerson = mapToRelatedPerson(
              values,
              patient,
              administrativeGenders,
              relationshipTypes
            );
            onSave(relatedPerson, actions);
          }}
          validationSchema={() =>
            yup.lazy((values) => {
              let startDate = new Date();
              if (values.startDate) {
                startDate = values.startDate;
              }
              return yup.object().shape({
                firstName: yup
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
                lastName: yup
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
                relationshipCode: yup
                  .string()
                  .required(
                    <FormattedMessage {...messages.validation.required} />
                  ),
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
                  .required(
                    <FormattedMessage {...messages.validation.required} />
                  ),
                identifierValue: yup
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
              });
            })
          }
          render={(formikProps) => (
            <ManageRelatedPersonForm
              {...formikProps}
              {...manageRelatedPersonFormProps}
            />
          )}
        />
      )}
    </div>
  );
}

ManageRelatedPerson.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  patientIdentifierSystems: PropTypes.array.isRequired,
  administrativeGenders: PropTypes.array.isRequired,
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
  relationshipTypes: PropTypes.array.isRequired,
  patient: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  selectedRelatedPerson: PropTypes.object,
};

export default ManageRelatedPerson;

function mapToRelatedPerson(
  capturedFormData,
  patient,
  administrativeGenders,
  relationshipTypes
) {
  const {
    startDate,
    endDate,
    active,
    firstName,
    lastName,
    relationshipCode,
    telecoms,
    addresses,
    genderCode,
    birthDate,
    identifierType,
    identifierValue,
  } = capturedFormData;
  let genderValue = '';
  if (!isUndefined(genderCode)) {
    const selectedAdministrativeGenders = find(administrativeGenders, {
      code: genderCode,
    });
    genderValue = selectedAdministrativeGenders.display;
  }
  const selectedRelationshipTypes = find(relationshipTypes, {
    code: relationshipCode,
  });
  const relationshipValue = selectedRelationshipTypes.display;
  const relationshipSystem = selectedRelationshipTypes.system;
  return {
    firstName,
    lastName,
    telecoms,
    addresses,
    genderCode,
    genderValue,
    relationshipCode,
    relationshipValue,
    relationshipSystem,
    identifierType,
    identifierValue,
    active,
    patient: patient.id,
    startDate: !isUndefined(startDate)
      ? moment(startDate).format('DD/MM/YYYY')
      : null,
    endDate: !isUndefined(endDate)
      ? moment(endDate).format('DD/MM/YYYY')
      : null,
    birthDate: !isUndefined(birthDate)
      ? moment(birthDate).format('DD/MM/YYYY')
      : null,
  };
}

function setInitialValues(selectedRelatedPerson) {
  let initialValues = null;
  if (!isEmpty(selectedRelatedPerson)) {
    initialValues = merge(
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'active'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'firstName'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'lastName'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'relationshipCode'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'birthDate'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'genderCode'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'startDate'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'endDate'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'identifierType'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'identifierValue'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'addresses'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'telecoms')
    );
  }
  return Util.pickByIdentity(initialValues);
}

function mapRelatedPersonToFormFields(selectedRelatedPerson, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedRelatedPerson[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(
      selectedRelatedPerson[fieldName]
    );
  }
  return fieldObject;
}

function mapRelatedPersonToDate(selectedRelatedPerson, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedRelatedPerson[fieldName])) {
    fieldObject[fieldName] =
      Util.setEmptyStringWhenUndefined(selectedRelatedPerson[fieldName]) &&
      selectedRelatedPerson[fieldName] &&
      new Date(selectedRelatedPerson[fieldName]);
  }
  return fieldObject;
}
