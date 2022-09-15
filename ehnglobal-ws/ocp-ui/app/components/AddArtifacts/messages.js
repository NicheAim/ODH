/*
 * AddArtifacts Messages
 *
 * This contains all the text for the AddArtifacts component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.AddArtifacts.title',
    defaultMessage: 'Related Artifacts',
  },
  addArtifactsButton: {
    id: 'ocpui.components.AddArtifacts.addArtifactsButton',
    defaultMessage: 'Add Artifacts',
  },
  saveArtifactButton: {
    id: 'ocpui.components.AddArtifacts.saveArtifactButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.AddArtifacts.cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    required: {
      id: 'ocpui.components.AddArtifacts.addArtifactsForm.validation.required',
      defaultMessage: 'Required',
    },
  },
  hintText: {
    display: {
      id: 'ocpui.components.AddArtifacts.addArtifactsForm.hintText.display',
      defaultMessage: 'Name (Display)',
    },
    type: {
      id: 'ocpui.components.AddArtifacts.addArtifactsForm.hintText.type',
      defaultMessage: 'Artifact Type',
    },
  },
  floatingLabelText: {
    display: {
      id: 'ocpui.components.AddArtifacts.addArtifactsForm.floatingLabelText.display',
      defaultMessage: 'Name (Display)',
    },
    type: {
      id: 'ocpui.components.AddArtifacts.addArtifactsForm.floatingLabelText.type',
      defaultMessage: 'Artifact Type',
    },
  },
  addedArtifactsTable: {
    tableHeaderName: {
      id: 'ocpui.components.AddArtifacts.addedArtifactsTable.tableHeaderName',
      defaultMessage: 'Name',
    },
    tableHeaderArtifactType: {
      id: 'ocpui.components.AddArtifacts.addedArtifactsTable.tableHeaderArtifactType',
      defaultMessage: 'Artifact Type',
    },
    tableHeaderAction: {
      id: 'ocpui.components.AddArtifacts.addedArtifactsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.AddArtifacts.addedArtifactsTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.AddArtifacts.addedArtifactsTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
});
