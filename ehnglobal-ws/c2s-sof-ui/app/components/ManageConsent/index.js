/**
 *
 * ManageConsent
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import yup from 'yup';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { SHARE_ALL, SHARE_SPECIFIC } from 'components/SelectMedicalInformation/constants';
import moment from 'moment';
import ManageConsentForm from './ManageConsentForm';
import messages from './messages';


function ManageConsent(props) {
  const {
    onSave,
    consentStateCodes,
    securityLabels,
    purposeOfUse,
    editMode,
    careCoordinatorContext,
    consent,
    initialConsentFormValues,
    shareType,
  } = props;
  const formData = {
    consentStateCodes,
    securityLabels,
    purposeOfUse,
    editMode,
    shareType,
    isCareCoordinator: !isEmpty(careCoordinatorContext),
  };
  return (
    <div>
      {((editMode && consent) || !editMode) &&
      <Formik
        initialValues={initialConsentFormValues(consent, careCoordinatorContext, securityLabels)}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        enableReinitialize
        validationSchema={() =>
          yup.lazy((values) => {
            let consentStart = new Date();
            if (values.consentStart) {
              consentStart = values.consentStart;
            }
            let schema = yup.object().shape({
              consentFromActors: yup.array()
                .required((<FormattedMessage {...messages.validation.minFromActors} />)),
              consentToActors: yup.array()
                .required((<FormattedMessage {...messages.validation.minToActors} />)),
              medicalInformation: yup.array()
                .required((<FormattedMessage {...messages.validation.minMedicalInfo} />)),
              purpose: yup.array()
                .required((<FormattedMessage {...messages.validation.minPurpose} />)),
              consentStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(moment(new Date()).format('MM/DD/YYYY'), (<FormattedMessage {...messages.validation.minStartDate} />)),
              consentEnd: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(moment(consentStart).format('MM/DD/YYYY'), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
            if (editMode) {
              schema = yup.object().shape({
                consentFromActors: yup.array()
                  .required((<FormattedMessage {...messages.validation.minFromActors} />)),
                consentToActors: yup.array()
                  .required((<FormattedMessage {...messages.validation.minToActors} />)),
                medicalInformation: yup.array()
                  .required((<FormattedMessage {...messages.validation.minMedicalInfo} />)),
                purpose: yup.array()
                  .required((<FormattedMessage {...messages.validation.minPurpose} />)),
                consentEnd: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(moment(consentStart).format('MM/DD/YYYY'), (<FormattedMessage {...messages.validation.minEndDate} />)),
              });
            }
            if (values.consentType) {
              schema = yup.object().shape({
                consentStart: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(moment(new Date()).format('MM/DD/YYYY'), (<FormattedMessage {...messages.validation.minStartDate} />)),
                consentEnd: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(moment(consentStart).format('MM/DD/YYYY'), (<FormattedMessage {...messages.validation.minEndDate} />)),
              });
            }
            if (values.consentType && editMode) {
              schema = yup.object().shape({
                consentEnd: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(moment(consentStart).format('MM/DD/YYYY'), (<FormattedMessage {...messages.validation.minEndDate} />)),
              });
            }
            return schema;
          })}
        render={(formikProps) => <ManageConsentForm {...formikProps} {...formData} />}
      />
      }
    </div>
  );
}

ManageConsent.propTypes = {
  consentStateCodes: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  careCoordinatorContext: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    name: PropTypes.string,
    organizations: PropTypes.array.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  initialConsentFormValues: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.date,
      end: PropTypes.date,
    }),
  }),
  shareType: PropTypes.oneOf([SHARE_ALL, SHARE_SPECIFIC]),
};

export default ManageConsent;
