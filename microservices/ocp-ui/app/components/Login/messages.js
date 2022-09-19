/*
 * Login Messages
 *
 * This contains all the text for the Login component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.Login.title',
    defaultMessage: 'Login to your account',
  },
  viewUserAccounts: {
    id: 'ocpui.components.Login.viewUserAccounts',
    defaultMessage: 'Sample User Login Details',
  },
  forgotLink: {
    id: 'ocpui.components.Login.forgotLink',
    defaultMessage: 'Forgot your username or password?',
  },
  validation: {
    required: {
      id: 'ocpui.components.Login.loginForm.validation.required',
      defaultMessage: 'Required',
    },
  },
  loginButton: {
    id: 'ocpui.components.Login.loginButton',
    defaultMessage: 'Login',
  },
  authenticatingButton: {
    id: 'ocpui.components.Login.authenticatingButton',
    defaultMessage: 'Login...',
  },
  hintText: {
    username: {
      id: 'ocpui.components.Login.loginForm.hintText.username',
      defaultMessage: 'Username',
    },
    password: {
      id: 'ocpui.components.Login.loginForm.hintText.password',
      defaultMessage: 'Password',
    },
  },
  floatingLabelText: {
    username: {
      id: 'ocpui.components.Login.loginForm.floatingLabelText.username',
      defaultMessage: 'Username',
    },
    password: {
      id: 'ocpui.components.Login.loginForm.floatingLabelText.password',
      defaultMessage: 'Password',
    },
  },
});
