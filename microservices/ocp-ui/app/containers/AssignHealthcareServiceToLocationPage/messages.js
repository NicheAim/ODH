/*
 * AssignHealthCareServiceToLocationPage Messages
 *
 * This contains all the text for the AssignHealthCareServiceToLocationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.header',
    defaultMessage: 'Assign Healthcare Services to the Location',
  },
  title: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.title',
    defaultMessage: 'TITLE',
  },
  organizationNotSelected: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.organizationNotSelected',
    defaultMessage: 'No healthcare services loaded. Please select an organization to view its healthcare services.',
  },
  noHealthcareServicesFound: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.noHealthcareServicesFound',
    defaultMessage: 'No healthcare services found.',
  },
  confirmLocationUnassignment: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.confirmUnassignment',
    defaultMessage: 'Are you sure you want to unassign {selectedHealthCareServiceName} \n' +
    '          from the location: {selectedLocationName}?',
  },
  dialogButtonLabelSubmit: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.dialogButtonLabelSubmit',
    defaultMessage: 'Submit',
  },
  dialogButtonLabelCancel: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.dialogButtonLabelCancel',
    defaultMessage: 'Cancel',
  },
  dialogTitleUnassignHealthcareService: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.dialogTitleUnassignHealthcareService',
    defaultMessage: 'Unassign Healthcare Service',
  },
  labelOrganization: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.labelOrganization',
    defaultMessage: 'Organization:',
  },
  labelLocation: {
    id: 'ocpui.containers.AssignHealthCareServiceToLocationPage.labelLocation',
    defaultMessage: 'Location:',
  },
});
