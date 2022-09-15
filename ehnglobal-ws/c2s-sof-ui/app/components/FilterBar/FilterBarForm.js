import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import FilterIcon from '@material-ui/icons/FilterList';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import FilterSection from 'components/FilterBar/FilterSection';
import FilterContainerGrid from 'components/FilterBar/FilterContainerGrid';
import StyledSelectField from 'components/StyledSelectField';
import StyledBarActionButton from 'components/StyledBarActionButton';
import messages from './messages';

function FilterBarForm(props) {
  const { dirty, isSubmitting, isValid, filterTypes, filterValueHintText, showFilter } = props;
  return (
    <Form>
      {showFilter &&
      <FilterSection>
        <FilterContainerGrid gap="5px" columns="30px 200px 80px">
          <FilterIcon color={'#336666'} />
          {showFilter &&
          <StyledSelectField
            fullWidth
            name="dateRangeCode"
            hintText={filterValueHintText}
          >
            {filterTypes && filterTypes.map((filterType) =>
              <MenuItem key={uniqueId()} value={filterType.value} primaryText={filterType.display} />,
            )}
          </StyledSelectField>
          }
          {showFilter &&
          <StyledBarActionButton
            fullWidth
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          >
            <FormattedMessage {...messages.filterButtonLabel} />
          </StyledBarActionButton>
          }
        </FilterContainerGrid>
      </FilterSection>
      }
    </Form>
  );
}

FilterBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  filterTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    display: PropTypes.node,
  })),
  filterValueHintText: PropTypes.node,
};

export default FilterBarForm;
