/*
 * AssignLocationToPractitionerPage Messages
 *
 * This contains all the text for the AssignLocationToPractitionerPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.header',
    defaultMessage: 'Assign Location to Practitioner',
  },
  organizationNotSelected: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.organizationNotSelected',
    defaultMessage: 'No locations found.',
  },
  labelOrganization: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.labelOrganization',
    defaultMessage: 'Organization:',
  },
  labelPractitioner: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.labelPractitioner',
    defaultMessage: 'Practitioner:',
  },
  noLocationFound: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.noLocationFound',
    defaultMessage: 'No locations found.',
  },
  dialogTitleUnassignLocation: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.dialogTitleUnassignLocation',
    defaultMessage: 'Unassign location',
  },
  dialogButtonLabelSubmit: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.dialogButtonLabelSubmit',
    defaultMessage: 'Submit',
  },
  dialogButtonLabelCancel: {
    id: 'ocpui.containers.AssignLocationToPractitionerPage.dialogButtonLabelCancel',
    defaultMessage: 'Cancel',
  },
  confirmPractitionerUnassignment: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.confirmPractitionerUnassignment',
    defaultMessage: 'Are you sure you want to unassign {selectedLocationName} \n' +
    '          from the practitioner: {selectedPractitionerName}?',
  },
});
