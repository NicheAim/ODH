/*
 * HealthcareServices Messages
 *
 * This contains all the text for the HealthcareServices component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  healthCareService: {
    id: 'ocpui.containers.HealthcareServices.header',
    defaultMessage: 'Healthcare Services',
  },
  labelHealthCareService: {
    id: 'ocpui.containers.HealthcareServices.labelHealthCareService',
    defaultMessage: 'Healthcare Services',
  },
  filterLabel: {
    id: 'ocpui.containers.Patients.filterLabel',
    defaultMessage: 'Include',
  },
  organizationNotSelected: {
    id: 'ocpui.containers.HealthcareServices.organizationNotSelected',
    defaultMessage: 'No healthcare services found. Please select an organization to view its healthcare services.',
  },
  noHealthcareServicesFound: {
    id: 'ocpui.containers.HealthcareServices.noHealthcareServicesFound',
    defaultMessage: 'No healthcare services found.',
  },
  inactive: {
    id: 'ocpui.containers.HealthcareServices.checkbox.inactive',
    defaultMessage: 'Inactive',
  },
  labelOrganization: {
    id: 'ocpui.containers.HealthcareServices.labelOrganization',
    defaultMessage: 'Organization:',
  },
  labelLocation: {
    id: 'ocpui.containers.HealthcareServices.labelLocation',
    defaultMessage: 'Location:',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.HealthcareServices.buttonLabelCreateNew',
    defaultMessage: 'New Healthcare Service',
  },
});
