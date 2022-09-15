/*
 * AddMultipleTelecoms Messages
 *
 * This contains all the text for the AddMultipleTelecoms component.
 */
import { defineMessages } from 'react-intl';

const prefixMessagesId = 'ocpui.components.AddMultipleTelecoms.';
const prefixFormId = prefixMessagesId + 'addTelecomsForm.';
const prefixFormHintTextId = prefixFormId + 'hintText.';
const prefixFormValidationId = prefixFormId + 'validation.';
const prefixFormFloatingLabelTextId = prefixFormId + 'floatingLabelText.';
const prefixTableId = prefixMessagesId + 'addedTelecomsTable.';

export default defineMessages({
  header: {
    id: prefixMessagesId + 'header',
    defaultMessage: 'Emergency Contact',
  },
  addTelecomsButton: {
    id: prefixMessagesId + 'addTelecomsButton',
    defaultMessage: 'Add Emergency Contact',
  },
  saveButton: {
    id: prefixMessagesId + 'saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: prefixMessagesId + 'cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    required: {
      id: prefixFormValidationId + 'required',
      defaultMessage: 'Required',
    },
    phone: {
      id: prefixFormValidationId + 'phone',
      defaultMessage:
        'Must be with formats: 123-456-7890 (123)456-7890 1234567890 123.456.7890',
    },
    minLength: {
      id: prefixFormValidationId + 'minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    minStartDate: {
      id: prefixFormValidationId + 'minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: prefixFormValidationId + 'minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
  },
  hintText: {
    firstName: {
      id: prefixFormHintTextId + 'firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: prefixFormHintTextId + 'lastName',
      defaultMessage: 'Last Name',
    },
    identifierType: {
      id: prefixFormHintTextId + 'identifierType',
      defaultMessage: 'Identifier Type',
    },
    dob: {
      id: prefixFormHintTextId + 'dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: prefixFormHintTextId + 'gender',
      defaultMessage: 'Gender',
    },
    startDate: {
      id: prefixFormHintTextId + 'startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: prefixFormHintTextId + 'endDate',
      defaultMessage: 'End Date',
    },
    identifierType: {
      id: prefixFormHintTextId + 'identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: prefixFormHintTextId + 'identifierValue',
      defaultMessage: 'Identifier Value',
    },
    system: {
      id: prefixFormHintTextId + 'system',
      defaultMessage: 'Contact Type',
    },
    value: {
      id: prefixFormHintTextId + 'value',
      defaultMessage: 'Detail',
    },
    use: {
      id: prefixFormHintTextId + 'use',
      defaultMessage: 'Contact Use',
    },
  },
  floatingLabelText: {
    firstName: {
      id: prefixFormFloatingLabelTextId + 'firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: prefixFormFloatingLabelTextId + 'lastName',
      defaultMessage: 'Last Name',
    },
    relationshipType: {
      id: prefixFormFloatingLabelTextId + 'relationshipType',
      defaultMessage: 'Relationship Type',
    },
    dob: {
      id: prefixFormFloatingLabelTextId + 'dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: prefixFormFloatingLabelTextId + 'gender',
      defaultMessage: 'Gender',
    },
    startDate: {
      id: prefixFormFloatingLabelTextId + 'startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: prefixFormFloatingLabelTextId + 'endDate',
      defaultMessage: 'End Date',
    },
    identifierType: {
      id: prefixFormFloatingLabelTextId + 'identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: prefixFormFloatingLabelTextId + 'identifierValue',
      defaultMessage: 'Identifier Value',
    },
    system: {
      id: prefixFormFloatingLabelTextId + 'system',
      defaultMessage: 'Contact Type',
    },
    value: {
      id: prefixFormFloatingLabelTextId + 'value',
      defaultMessage: 'Detail',
    },
    use: {
      id: prefixFormFloatingLabelTextId + 'use',
      defaultMessage: 'Contact Use',
    },
  },
  addedTelecomsTable: {
    tableHeaderFirstName: {
      id: prefixTableId + 'tableHeaderFirstName',
      defaultMessage: 'First Name',
    },
    tableHeaderLastName: {
      id: prefixTableId + 'tableHeaderLastName',
      defaultMessage: 'Last Name',
    },
    tableHeaderAction: {
      id: prefixTableId + 'tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: prefixTableId + 'tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: prefixTableId + 'tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
});
