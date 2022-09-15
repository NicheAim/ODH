/*
 * Practitioners Messages
 *
 * This contains all the text for the Practitioners component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  searchHeader: {
    id: 'c2s.containers.Practitioners.searchHeader',
    defaultMessage: 'Search',
  },
  filterLabel: {
    id: 'c2s.containers.Practitioners.filterLabel',
    defaultMessage: 'Include',
  },
  searchTermsInvalid: {
    id: 'c2s.containers.Practitioners.header',
    defaultMessage: 'Must be at least {SEARCH_TERM_MIN_LENGTH} characters long.',
  },
  inactive: {
    id: 'c2s.containers.Practitioners.checkbox.inactive',
    defaultMessage: 'Inactive',
  },
  buttonLabelCreateNew: {
    id: 'c2s.containers.Practitioners.checkbox.inactive',
    defaultMessage: 'New Practitioner',
  },
});
