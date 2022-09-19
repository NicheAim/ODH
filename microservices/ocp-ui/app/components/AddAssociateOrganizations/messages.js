/*
 * AddAssociateOrganizations Messages
 *
 * This contains all the text for the AddAssociateOrganizations component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.AddAssociateOrganizations.header',
    defaultMessage: 'Associate Organizations',
  },
  addOrganizationButton: {
    id: 'ocpui.components.AddAssociateOrganizations.addOrganizationButton',
    defaultMessage: 'Add Organization',
  },
  title: {
    id: 'ocpui.components.AddAssociateOrganizations.title',
    defaultMessage: 'Search Organization',
  },
  closeButton: {
    id: 'ocpui.components.AddAssociateOrganizations.closeButton',
    defaultMessage: 'Close',
  },
  noOrganizationsFound: {
    id: 'ocpui.components.AddPractitionerRole.noOrganizationsFound',
    defaultMessage: 'No organizations found.',
  },
  addedOrganizationsTable: {
    tableColumnName: {
      id: 'ocpui.components.AddedOrganizationsTable.tableColumnName',
      defaultMessage: 'Name',
    },
    tableColumnCode: {
      id: 'ocpui.components.AddedOrganizationsTable.tableColumnCode',
      defaultMessage: 'Role',
    },
    tableColumnSpecialty: {
      id: 'ocpui.components.AddedOrganizationsTable.tableColumnSpecialty',
      defaultMessage: 'Specialty',
    },
    tableColumnActive: {
      id: 'ocpui.components.AddedOrganizationsTable.tableColumnActive',
      defaultMessage: 'Active',
    },
    roleTypeLabel: {
      id: 'ocpui.components.AddedOrganizationsTable.roleTypeLabel',
      defaultMessage: 'Role',
    },
    specialtyLabel: {
      id: 'ocpui.components.AddedOrganizationsTable.specialtyLabel',
      defaultMessage: 'Specialty',
    },
  },
});
