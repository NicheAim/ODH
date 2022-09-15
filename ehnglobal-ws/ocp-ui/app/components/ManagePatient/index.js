/**
 *
 * ManagePatient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePatientForm from './ManagePatientForm';
import messages from './messages';
import {
  TEXT_MIN_LENGTH,
  SSN_EXACT_LENGTH,
  MEDICAID_ID_EXACT_LENGTH,
  IDENTIFIER_TYPE_SSN,
  IDENTIFIER_TYPE_MEDICA_ID,
} from './constants';

function ManagePatient(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const ssnExactLength = SSN_EXACT_LENGTH;
  const medicaidIdExactLength = MEDICAID_ID_EXACT_LENGTH;
  const {
    onSave,
    patient,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    usCoreRaces,
    usCoreEthnicities,
    usCoreBirthSexes,
    languages,
    telecomSystems,
    telecomUses,
    flagStatuses,
    practitioner,
    flagCategories,
    practitioners,
    organization,
    episodeOfCareType,
    episodeOfCareStatus,
    policyHolderRelationship,
    coverageFmStatus,
    coverageType,
    subscriptionOptions,
    composePatientReference,
    getPatientFullName,
    relationshipTypes,
    emergencyContacts,
  } = props;

  const managePatientFormProps = {
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    usCoreRaces,
    usCoreEthnicities,
    usCoreBirthSexes,
    languages,
    telecomSystems,
    telecomUses,
    flagStatuses,
    flagCategories,
    practitioner,
    practitioners,
    organization,
    episodeOfCareType,
    episodeOfCareStatus,
    policyHolderRelationship,
    coverageFmStatus,
    coverageType,
    subscriptionOptions,
    composePatientReference,
    getPatientFullName,
    patient,
    relationshipTypes,
  };

  const initialValues = {
    ...patient,
    emergencyContacts: emergencyContacts,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          lastName: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />)
            .min(
              minimumLength,
              <FormattedMessage
                {...messages.validation.minLength}
                values={{ minimumLength }}
              />
            ),
          firstName: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />)
            .min(
              minimumLength,
              <FormattedMessage
                {...messages.validation.minLength}
                values={{ minimumLength }}
              />
            ),
          genderCode: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          race: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          ethnicity: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),
          language: yup.string(),
          birthDate: yup
            .date()
            .required(<FormattedMessage {...messages.validation.required} />),

          identifierType: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),

          identifierType2: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />),

          identifierValue: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />)
            .when('identifierType', {
              is: (value) => value == IDENTIFIER_TYPE_SSN,
              then: yup
                .string()
                .matches(
                  /^\d+$/,
                  <FormattedMessage
                    {...messages.validation.numericCharacters}
                  />
                )
                .length(
                  ssnExactLength,
                  <FormattedMessage
                    {...messages.validation.exactLength}
                    values={{ exactLength: ssnExactLength }}
                  />
                ),
            })
            .when('identifierType', {
              is: (value) => value == IDENTIFIER_TYPE_MEDICA_ID,
              then: yup
                .string()
                .matches(
                  /^\d+$/,
                  <FormattedMessage
                    {...messages.validation.numericCharacters}
                  />
                )
                .length(
                  medicaidIdExactLength,
                  <FormattedMessage
                    {...messages.validation.exactLength}
                    values={{ exactLength: medicaidIdExactLength }}
                  />
                ),
            }),

          identifierValue2: yup
            .string()
            .required(<FormattedMessage {...messages.validation.required} />)
            .when('identifierType2', {
              is: (value) => value == IDENTIFIER_TYPE_SSN,
              then: yup
                .string()
                .matches(
                  /^\d+$/,
                  <FormattedMessage
                    {...messages.validation.numericCharacters}
                  />
                )
                .length(
                  ssnExactLength,
                  <FormattedMessage
                    {...messages.validation.exactLength}
                    values={{ exactLength: ssnExactLength }}
                  />
                ),
            })
            .when('identifierType2', {
              is: (value) => value == IDENTIFIER_TYPE_MEDICA_ID,
              then: yup
                .string()
                .matches(
                  /^\d+$/,
                  <FormattedMessage
                    {...messages.validation.numericCharacters}
                  />
                )
                .length(
                  medicaidIdExactLength,
                  <FormattedMessage
                    {...messages.validation.exactLength}
                    values={{ exactLength: medicaidIdExactLength }}
                  />
                ),
            }),
        })}
        render={(formikProps) => (
          <ManagePatientForm {...formikProps} {...managePatientFormProps} />
        )}
      />
    </div>
  );
}

ManagePatient.propTypes = {
  onSave: PropTypes.func.isRequired,
  composePatientReference: PropTypes.func.isRequired,
  getPatientFullName: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  patientIdentifierSystems: PropTypes.array.isRequired,
  administrativeGenders: PropTypes.array.isRequired,
  usCoreRaces: PropTypes.array.isRequired,
  usCoreEthnicities: PropTypes.array.isRequired,
  usCoreBirthSexes: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  episodeOfCareType: PropTypes.array.isRequired,
  episodeOfCareStatus: PropTypes.array.isRequired,
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
  flagStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  flagCategories: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  patient: PropTypes.object,
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    })
  ),
  organization: PropTypes.object,
  subscriptionOptions: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  coverageType: PropTypes.array,
  coverageFmStatus: PropTypes.array,
};

export default ManagePatient;
