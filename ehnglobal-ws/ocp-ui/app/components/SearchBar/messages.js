/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  hintText: {
    id: 'ocpui.components.SearchBar.hintText',
    defaultMessage: 'Name or ID',
  },
  floatingLabelText: {
    id: 'ocpui.components.SearchBar.floatingLabelText',
    defaultMessage: 'Name or ID',
  },
  buttonTooltip: {
    id: 'ocpui.components.SearchBar.buttonTooltip',
    defaultMessage: 'Search',
  },
  searchButton: {
    id: 'ocpui.components.SearchBar.searchButton',
    defaultMessage: 'Search',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.SearchBar.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.SearchBar.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.SearchBar.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
  includeInactive: {
    id: 'ocpui.components.SearchBar.includeInactive',
    defaultMessage: 'Inactive',
  },
  searchByName: {
    id: 'ocpui.components.SearchBar.searchByName',
    defaultMessage: 'By Name',
  },
  searchById: {
    id: 'ocpui.components.SearchBar.searchById',
    defaultMessage: 'By ID',
  },
  searchPractitioner: {
    id: 'ocpui.components.SearchBar.searchPractitioner',
    defaultMessage: 'Practitioner',
  },
  searchPatient: {
    id: 'ocpui.components.SearchBar.searchPatient',
    defaultMessage: 'Patient',
  },
  searchByDate: {
    id: 'ocpui.components.SearchBar.searchByDate',
    defaultMessage: 'By Date',
  },
  searchByDueDate: {
    id: 'ocpui.components.SearchBar.searchByDueDate',
    defaultMessage: 'By Due Date',
  },
  searchHeader: {
    id: 'ocpui.containers.Patients.searchHeader',
    defaultMessage: 'Search',
  },
  filterLabel: {
    id: 'ocpui.containers.Patients.filterLabel',
    defaultMessage: 'Include:',
  },
  status: {
    upcoming: {
      id: 'ocpui.containers.Patients.upcoming',
      defaultMessage: 'Upcoming',
    },
    dueToday: {
      id: 'ocpui.containers.Patients.dueToday',
      defaultMessage: 'Due Today',
    },
    overDue: {
      id: 'ocpui.containers.Patients.overDue',
      defaultMessage: 'Over Due',
    },
  },
});
