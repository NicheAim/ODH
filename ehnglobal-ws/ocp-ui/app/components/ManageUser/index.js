/**
 *
 * ManageUser
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import find from 'lodash/find';

import messages from './messages';
import ManageUserForm from './ManageUserForm';
import { PATIENT } from './constants';


function ManageUser(props) {
  const passwordPattern = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@!#$]).*$');
  const { user, groups, onSave, resourceType, uaaUser, organization, handleRemoveUser } = props;
  const isEditing = (uaaUser.length > 0);
  const formData = { user, groups, resourceType, isEditing, uaaUser, handleRemoveUser };
  const patientGroup = find(groups, { displayName: 'ocp.role.client' });
  const initialValues = {
    firstName: user && user.name[0] && user.name[0].firstName,
    lastName: user && user.name[0] && user.name[0].lastName,
    username: uaaUser && uaaUser[0] && uaaUser[0].username,
    organization,
    group: (uaaUser && uaaUser[0] && uaaUser[0].groupId) || (resourceType === PATIENT ? patientGroup && patientGroup.id : null),
  };

  const createUserValidationScheme = yup.object().shape({
    username: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    password: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />))
      .matches(passwordPattern, <FormattedMessage {...messages.validation.passwordPattern} />),
    repeatPassword: yup.string()
      .oneOf([yup.ref('password')], <FormattedMessage {...messages.validation.notMatch} />)
      .required((<FormattedMessage {...messages.validation.required} />)),
    group: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    organization: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  });

  const updateUserValidationScheme = yup.object().shape({
    username: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    group: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    organization: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),

  });

  return (
    <div>
      <Formik
        initialValues={{ ...initialValues }}
        onSubmit={(values, actions) => {
          if (isEditing) {
            onSave(merge(values, { isEditing, id:  uaaUser[0] && uaaUser[0].id }), actions);
          } else {
            onSave(values, actions);
          }
        }}
        validationSchema={isEditing ? updateUserValidationScheme : createUserValidationScheme}
        render={(formikProps) => <ManageUserForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageUser.propTypes = {
  user: PropTypes.object,
  resourceType: PropTypes.string,
  groups: PropTypes.array,
  uaaUser: PropTypes.array,
  organization: PropTypes.string,
  onSave: PropTypes.func,
  handleRemoveUser: PropTypes.func,
};

export default ManageUser;
