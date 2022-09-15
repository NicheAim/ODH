/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';
import { SEARCH_BY_DATE, SEARCH_BY_DUE_DATE, SEARCH_BY_ID, SEARCH_BY_NAME } from 'components/SearchBar/constants';

import SearchBarForm from './SearchBarForm';
import messages from './messages';

function SearchBar(props) {
  const { minimumLength, onSearch, searchField, showToDoSpecificFilters } = props;
  const composedSearchFields = getToDoSpecificSearchField(searchField, showToDoSpecificFilters);
  const searchFormProps = { searchField: composedSearchFields, showToDoSpecificFilters };

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
      searchValueHintText: searchFieldObject.searchValueHintText,
    };
  }
  function initialFormValues() {
    let initialValues = { showInactive: false, searchType: SEARCH_BY_NAME };
    if (!isEmpty(searchField.searchTypes)) {
      initialValues = {
        showInactive: false,
        searchType: head(searchField.searchTypes).value,
      };
    }
    return initialValues;
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues(searchField)}
        onSubmit={(values, actions) => {
          const { searchValue, showInactive, searchType } = values;
          onSearch(searchValue, showInactive, searchType);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          searchValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
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
  minimumLength: PropTypes.number,
  onSearch: PropTypes.func.isRequired,
  showToDoSpecificFilters: PropTypes.bool,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    searchValueHintText: PropTypes.node.isRequired,
  }),
};

SearchBar.defaultProps = {
  minimumLength: 3,
  showToDoSpecificFilters: false,
  searchField: {
    searchTypes: [{
      value: SEARCH_BY_NAME,
      display: <FormattedMessage {...messages.searchByName} />,
    }, {
      value: SEARCH_BY_ID,
      display: <FormattedMessage {...messages.searchById} />,
    }],
    searchValueHintText: <FormattedMessage {...messages.hintText} />,
  },
};

export default SearchBar;
