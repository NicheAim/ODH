/**
 *
 * ManageHealthcareService
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

import Util from 'utils/Util';
import { TEXT_MIN_LENGTH } from './constants';
import ManageHealthcareServiceForm from './ManageHealthcareServiceForm';
import messages from './messages';

function ManageHealthcareService(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const { onSave, healthcareServiceCategories, healthcareServiceTypes, healthcareServiceSpecialities, healthcareServiceReferralMethods, healthcareServiceStatuses, telecomSystems, organization, editMode, currentHealthcareService } = props;
  const formData = {
    organization,
    healthcareServiceCategories,
    healthcareServiceTypes,
    healthcareServiceSpecialities,
    healthcareServiceReferralMethods,
    healthcareServiceStatuses,
    telecomSystems,
    editMode,
  };
  return (
    <div>
      {((editMode && currentHealthcareService) || !editMode) &&
      <Formik
        initialValues={setFormData(currentHealthcareService)}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          hcsProgramName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          hcsType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          category: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <ManageHealthcareServiceForm {...formikProps} {...formData} />}
      />
      }
    </div>
  );
}

ManageHealthcareService.propTypes = {
  onSave: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  healthcareServiceCategories: PropTypes.array.isRequired,
  healthcareServiceTypes: PropTypes.array.isRequired,
  healthcareServiceSpecialities: PropTypes.array.isRequired,
  healthcareServiceReferralMethods: PropTypes.array.isRequired,
  healthcareServiceStatuses: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  currentHealthcareService: PropTypes.any,
};

export default ManageHealthcareService;

function setFormData(currentHealthcareService) {
  let formData = null;
  if (!isEmpty(currentHealthcareService)) {
    formData = merge(mapHealthcareServiceToName(currentHealthcareService),
      mapHealthcareServiceToProgramName(currentHealthcareService),
      mapHealthcareServiceToCategory(currentHealthcareService),
      mapHealthcareServiceToType(currentHealthcareService),
      mapHealthcareServiceToSpeciality(currentHealthcareService),
      mapHealthcareServiceToReferralMethod(currentHealthcareService),
      mapHealthcareServiceToFirstTelecoms(currentHealthcareService));
    return merge(Util.pickByIdentity(formData), mapHealthcareServiceToStatus(currentHealthcareService));
  }
  return Util.pickByIdentity(formData);
}

function mapHealthcareServiceToName(healthcareService) {
  return {
    name: Util.setEmptyStringWhenUndefined(healthcareService.name),
  };
}

function mapHealthcareServiceToProgramName(healthcareService) {
  let programName = {};
  if (healthcareService.programName.length > 0) {
    const firstProgramName = healthcareService.programName[0];
    programName = {
      hcsProgramName: Util.setEmptyStringWhenUndefined(firstProgramName),
    };
  }
  return programName;
}

function mapHealthcareServiceToStatus(healthcareService) {
  return {
    hcsStatus: Util.setEmptyStringWhenUndefined(healthcareService.active),
  };
}

function mapHealthcareServiceToCategory(healthcareService) {
  let category = {};
  if (healthcareService.category && healthcareService.category.code) {
    category = {
      category: Util.setEmptyStringWhenUndefined(healthcareService.category.code),
    };
  }
  return category;
}

function mapHealthcareServiceToType(healthcareService) {
  let type = {};
  if (healthcareService.type.length > 0) {
    const firstType = healthcareService.type[0];
    type = {
      hcsType: Util.setEmptyStringWhenUndefined(firstType.code),
    };
  }
  return type;
}

function mapHealthcareServiceToSpeciality(healthcareService) {
  let speciality = {};
  if (healthcareService.specialty.length > 0) {
    const firstSpeciality = healthcareService.specialty[0];
    speciality = {
      hcsSpecialty: Util.setEmptyStringWhenUndefined(firstSpeciality.code),
    };
  }
  return speciality;
}

function mapHealthcareServiceToReferralMethod(healthcareService) {
  let hcsReferralMethod = {};
  if (healthcareService.referralMethod.length > 0) {
    const firstReferralMethod = healthcareService.referralMethod[0];
    hcsReferralMethod = {
      hcsReferralMethod: Util.setEmptyStringWhenUndefined(firstReferralMethod.code),
    };
  }
  return hcsReferralMethod;
}

function mapHealthcareServiceToFirstTelecoms(healthcareService) {
  let telecom = {};
  if (healthcareService.telecom.length > 0) {
    const firstTelecom = healthcareService.telecom[0];
    telecom = {
      telecomType: Util.setEmptyStringWhenUndefined(firstTelecom.system),
      telecomValue: Util.setEmptyStringWhenUndefined(firstTelecom.value),
    };
  }
  return telecom;
}
