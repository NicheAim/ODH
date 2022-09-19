/*
 * Practitioners Messages
 *
 * This contains all the text for the Practitioners component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  searchHeader: {
    id: 'ocpui.containers.Practitioners.searchHeader',
    defaultMessage: 'Search',
  },
  filterLabel: {
    id: 'ocpui.containers.Practitioners.filterLabel',
    defaultMessage: 'Include',
  },
  searchTermsInvalid: {
    id: 'ocpui.containers.Practitioners.header',
    defaultMessage: 'Must be at least {SEARCH_TERM_MIN_LENGTH} characters long.',
  },
  inactive: {
    id: 'ocpui.containers.Practitioners.checkbox.inactive',
    defaultMessage: 'Inactive',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.Practitioners.checkbox.inactive',
    defaultMessage: 'New Practitioner/Resource',
  },
});
