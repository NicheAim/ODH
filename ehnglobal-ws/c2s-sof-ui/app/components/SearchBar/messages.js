/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  hintText: {
    id: 'c2s.components.SearchBar.hintText',
    defaultMessage: 'Name or ID',
  },
  floatingLabelText: {
    id: 'c2s.components.SearchBar.floatingLabelText',
    defaultMessage: 'Name or ID',
  },
  buttonTooltip: {
    id: 'c2s.components.SearchBar.buttonTooltip',
    defaultMessage: 'Search',
  },
  searchButton: {
    id: 'c2s.components.SearchBar.searchButton',
    defaultMessage: 'Search',
  },
  validation: {
    minLength: {
      id: 'c2s.components.SearchBar.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'c2s.components.SearchBar.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'c2s.components.SearchBar.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
  includeInactive: {
    id: 'c2s.components.SearchBar.includeInactive',
    defaultMessage: 'Inactive',
  },
  searchByName: {
    id: 'c2s.components.SearchBar.searchByName',
    defaultMessage: 'By Name',
  },
  searchById: {
    id: 'c2s.components.SearchBar.searchById',
    defaultMessage: 'By ID',
  },
  searchByDate: {
    id: 'c2s.components.SearchBar.searchByDate',
    defaultMessage: 'By Date',
  },
  searchByDueDate: {
    id: 'c2s.components.SearchBar.searchByDueDate',
    defaultMessage: 'By Due Date',
  },
  searchHeader: {
    id: 'c2s.containers.Patients.searchHeader',
    defaultMessage: 'Search',
  },
  filterLabel: {
    id: 'c2s.containers.Patients.filterLabel',
    defaultMessage: 'Include:',
  },
  status: {
    upcoming: {
      id: 'c2s.containers.Patients.upcoming',
      defaultMessage: 'Upcoming',
    },
    dueToday: {
      id: 'c2s.containers.Patients.dueToday',
      defaultMessage: 'Due Today',
    },
    overDue: {
      id: 'c2s.containers.Patients.overDue',
      defaultMessage: 'Over Due',
    },
  },
});
