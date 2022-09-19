/*
 * RelatedPersons Messages
 *
 * This contains all the text for the RelatedPersons component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.RelatedPersons.header',
    defaultMessage: 'Related Persons',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.RelatedPersons.buttonLabelCreateNew',
    defaultMessage: 'Create new',
  },
  relatedPersons: {
    id: 'ocpui.containers.RelatedPersons.relatedPersons',
    defaultMessage: 'related persons',
  },
  noRelatedPersonSelected: {
    id: 'ocpui.containers.RelatedPersons.noRelatedPersonSelected',
    defaultMessage: 'No related persons loaded. Please select a patient to view his/her related person.',
  },
  noRelatedPersonFound: {
    id: 'ocpui.containers.RelatedPersons.noRelatedPersonFound',
    defaultMessage: 'No related persons found.',
  },
  labelPatientName: {
    id: 'ocpui.containers.RelatedPersons.labelPatientName',
    defaultMessage: 'Patient:',
  },
});
