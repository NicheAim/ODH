/*
 * AssignPermissionGroupOnOrganization Messages
 *
 * This contains all the text for the AssignPermissionGroupOnOrganization component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  assignPermissionGroupButton: {
    id: 'ocpui.components.AssignPermissionGroupOnOrganization.assignPermissionGroupButton',
    defaultMessage: 'Assign Permission Group',
  },
  dialogTitle: {
    id: 'ocpui.components.AssignPermissionGroupOnOrganization.dialogTitle',
    defaultMessage: 'Assign Permission Group',
  },
  assignGroupsForm: {
    validation: {
      required: {
        id: 'ocpui.components.AssignPermissionGroupsForm.validation.required',
        defaultMessage: 'Required',
      },
    },
    hintText: {
      organization: {
        id: 'ocpui.components.AssignPermissionGroupsForm.hintText.organization',
        defaultMessage: 'Select Organization',
      },
      permissionGroup: {
        id: 'ocpui.components.AssignPermissionGroupsForm.hintText.permissionGroup',
        defaultMessage: 'Select Permission Group',
      },
    },
    floatingLabelText: {
      organization: {
        id: 'ocpui.components.AssignPermissionGroupsForm.floatingLabelText.organization',
        defaultMessage: 'Select Organization',
      },
      permissionGroup: {
        id: 'ocpui.components.AssignPermissionGroupsForm.floatingLabelText.permissionGroup',
        defaultMessage: 'Select Permission Group',
      },
    },
    saveButton: {
      id: 'ocpui.components.AssignPermissionGroupsForm.saveButton',
      defaultMessage: 'Save',
    },
    cancelButton: {
      id: 'ocpui.components.AssignPermissionGroupsForm.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
  assignedGroupsTable: {
    tableHeaderOrganization: {
      id: 'ocpui.components.assignedGroupsTable.tableHeaderOrganization',
      defaultMessage: 'Organization',
    },
    tableHeaderRole: {
      id: 'ocpui.components.assignedGroupsTable.tableHeaderRole',
      defaultMessage: 'Permission Group',
    },
    tableHeaderAction: {
      id: 'ocpui.components.assignedGroupsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.assignedGroupsTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.assignedGroupsTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
});
