/**
 *
 * SearchBar
 *
 */

import {
  SEARCH_BY_DATE,
  SEARCH_BY_DUE_DATE,
  SEARCH_BY_ID,
  SEARCH_BY_NAME,
  SEARCH_PATIENT,
  SEARCH_PRACTITIONER,
} from 'components/SearchBar/constants';
import { Formik } from 'formik';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import messages from './messages';

import SearchBarForm from './SearchBarForm';

function SearchBar(props) {
  const { minimumLength, onSearch, searchField, showToDoSpecificFilters, showUserRegistrationRoleSelection } = props;
  const composedSearchFields = getToDoSpecificSearchField(searchField, showToDoSpecificFilters);
  const searchFormProps = { searchField: composedSearchFields, showToDoSpecificFilters, showUserRegistrationRoleSelection };

  function getToDoSpecificSearchField(searchFieldObject, showAdditionalSearchFields) {
    const newSearchTypes = !showAdditionalSearchFields ? searchFieldObject.searchTypes : [...searchFieldObject.searchTypes,
      {
        value: SEARCH_BY_DATE,
        display: <FormattedMessage {...messages.searchByDate} />,
      }, {
        value: SEARCH_BY_DUE_DATE,
        display: <FormattedMessage {...messages.searchByDueDate} />,
      },
    ];

    return {
      searchTypes: newSearchTypes,
      resourceTypes: searchFieldObject.resourceTypes,
      searchValueHintText: searchFieldObject.searchValueHintText,
    };
  }

  function initialFormValues() {
    let initialValues = { showInactive: false, searchType: SEARCH_BY_NAME, resourceType: SEARCH_PRACTITIONER };
    if (!isEmpty(searchField.searchTypes)) {
      initialValues = {
        showInactive: false,
        searchType: head(searchField.searchTypes).value,
      };
    }
    if (!isEmpty(searchField.searchTypes) && showUserRegistrationRoleSelection) {
      initialValues = {
        showInactive: false,
        searchType: head(searchField.searchTypes).value,
        resourceType: head(searchField.resourceTypes).value,
      };
    }
    return initialValues;
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues(searchField)}
        onSubmit={(values, actions) => {
          const { searchValue, showInactive, searchType, resourceType } = values;
          if (showUserRegistrationRoleSelection) {
            onSearch(searchValue, showInactive, searchType, resourceType);
          } else {
            onSearch(searchValue, showInactive, searchType);
          }
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          searchValue: yup.string()
            .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          searchType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          showInactive: yup.boolean(),
        })}
        render={(formikProps) => <SearchBarForm {...formikProps} {...searchFormProps} />}
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  minimumLength: PropTypes.number.isRequired,
  showToDoSpecificFilters: PropTypes.bool,
  showUserRegistrationRoleSelection: PropTypes.bool,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    resourceTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    searchValueHintText: PropTypes.node.isRequired,
  }),
};

SearchBar.defaultProps = {
  minimumLength: 3,
  showToDoSpecificFilters: false,
  showUserRegistrationRoleSelection: false,
  searchField: {
    searchTypes: [{
      value: SEARCH_BY_NAME,
      display: <FormattedMessage {...messages.searchByName} />,
    }, {
      value: SEARCH_BY_ID,
      display: <FormattedMessage {...messages.searchById} />,
    }],
    resourceTypes: [{
      value: SEARCH_PRACTITIONER,
      display: <FormattedMessage {...messages.searchPractitioner} />,
    }, {
      value: SEARCH_PATIENT,
      display: <FormattedMessage {...messages.searchPatient} />,
    }],
    searchValueHintText: <FormattedMessage {...messages.hintText} />,
  },
};

export default SearchBar;
