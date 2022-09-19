/**
*
* FilterBar
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import FilterBarForm from 'components/FilterBar/FilterBarForm';
import messages from './messages';

function FilterBar(props) {
  const { onFilter, filterField, showFilter } = props;
  const filterFormProps = {
    filterTypes: filterField && filterField.filterTypes ? filterField.filterTypes : null,
    filterValueHintText: filterField && filterField.filterValueHintText ? filterField.filterValueHintText : null,
    showFilter,
  };
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          const { dateRangeCode } = values;
          onFilter(dateRangeCode);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          dateRangeCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <FilterBarForm {...formikProps} {...filterFormProps} />}
      />
    </div>
  );
}

FilterBar.propTypes = {
  showFilter: PropTypes.bool,
  onFilter: PropTypes.func,
  filterField: PropTypes.shape({
    filterTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      display: PropTypes.node,
    })),
    filterValueHintText: PropTypes.node,
  }),
};

export default FilterBar;
