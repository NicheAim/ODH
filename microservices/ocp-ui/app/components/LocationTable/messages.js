/*
 * LocationTable Messages
 *
 * This contains all the text for the LocationTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.LocationTable.header',
    defaultMessage: 'This is the LocationTable component !',
  },
  tableHeaderColumnName: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnName',
    defaultMessage: 'Name',
  },
  tableHeaderColumnIdentifier: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnIdentifier',
    defaultMessage: 'Identifier',
  },
  tableHeaderColumnStatus: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnStatus',
    defaultMessage: 'Status',
  },
  tableHeaderColumnTelecoms: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnTelecoms',
    defaultMessage: 'Contact Detail(s)',
  },
  tableHeaderColumnAddress: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnAddress',
    defaultMessage: 'Address',
  },
  tableHeaderColumnAction: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnAction',
    defaultMessage: 'Action',
  },
  expansionRowDetailsIdentifiers: {
    id: 'ocpui.components.LocationTable.expansionRowDetailsIdentifiers',
    defaultMessage: 'Identifier',
  },
  expansionRowDetailsLocationType: {
    id: 'ocpui.components.LocationTable.expansionRowDetailsLocationType',
    defaultMessage: 'Location Physical Type',
  },
  actionLabelEdit: {
    id: 'ocpui.components.LocationTable.actionLabelEdit',
    defaultMessage: 'Edit',
  },
  actionLabelAssignHealthCareService: {
    id: 'ocpui.components.LocationTable.actionLabelAssignHealthCareService',
    defaultMessage: 'Assign Healthcare Service',
  },
  noLocationsFound: {
    id: 'ocpui.containers.Locations.noLocationsFound',
    defaultMessage: 'No locations found.',
  },
});
