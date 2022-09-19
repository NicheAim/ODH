/*
 * Conditions Messages
 *
 * This contains all the text for the Conditions component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.Conditions.header',
    defaultMessage: 'Conditions',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.Conditions.buttonLabelCreateNew',
    defaultMessage: 'Create new',
  },
  conditions: {
    id: 'ocpui.containers.Conditions.conditions',
    defaultMessage: 'conditions',
  },
  noConditionSelected: {
    id: 'ocpui.containers.Conditions.noConditionSelected',
    defaultMessage:
      'No conditions loaded. Please select a patient to view his/her conditions.',
  },
  noConditionFound: {
    id: 'ocpui.containers.Conditions.noConditionFound',
    defaultMessage: 'No conditions found.',
  },
  labelPatientName: {
    id: 'ocpui.containers.Conditions.labelPatientName',
    defaultMessage: 'Patient:',
  },
});
