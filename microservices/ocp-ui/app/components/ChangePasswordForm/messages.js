/*
 * ChangePasswordForm Messages
 *
 * This contains all the text for the ChangePasswordForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  usernameLabel: {
    id: 'ocpui.components.ChangePasswordForm.usernameLabel',
    defaultMessage: 'Username',
  },
  saveButton: {
    id: 'ocpui.components.ChangePasswordForm.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.ChangePasswordForm.cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    required: {
      id: 'ocpui.components.ChangePasswordForm.validation.required',
      defaultMessage: 'Required',
    },
    passwordPattern: {
      id: 'ocpui.components.ChangePasswordForm.validation.passwordPattern',
      defaultMessage: 'Password must contain 8 characters and at least one number, one letter and one unique character such as @!#$',
    },
    matchOldPassword: {
      id: 'ocpui.components.ChangePasswordForm.validation.matchOldPassword',
      defaultMessage: 'New password cannot be the same as the old password',
    },
    notMatch: {
      id: 'ocpui.components.ChangePasswordForm.validation.notMatch',
      defaultMessage: 'Password does not match',
    },
  },
  hintText: {
    oldPassword: {
      id: 'ocpui.components.ChangePasswordForm.hintText.oldPassword',
      defaultMessage: 'Current Password',
    },
    newPassword: {
      id: 'ocpui.components.ChangePasswordForm.hintText.newPassword',
      defaultMessage: 'New Password',
    },
    confirmPassword: {
      id: 'ocpui.components.ChangePasswordForm.hintText.confirmPassword',
      defaultMessage: 'Confirm Password',
    },
  },
  floatingLabelText: {
    oldPassword: {
      id: 'ocpui.components.ChangePasswordForm.floatingLabelText.oldPassword',
      defaultMessage: 'Current Password',
    },
    newPassword: {
      id: 'ocpui.components.ChangePasswordForm.floatingLabelText.newPassword',
      defaultMessage: 'New Password',
    },
    confirmPassword: {
      id: 'ocpui.components.ChangePasswordForm.floatingLabelText.confirmPassword',
      defaultMessage: 'Confirm Password',
    },
  },
});
