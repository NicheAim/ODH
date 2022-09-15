import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import ActionSearch from '@material-ui/icons/Search';
import MenuItem from 'material-ui/MenuItem';
import uniqueId from 'lodash/uniqueId';
import { Cell } from 'styled-css-grid';

import StyledFormikCheckbox from 'components/StyledFormikCheckbox';
import StyledSelectField from 'components/StyledSelectField';
import StyledBarActionButton from 'components/StyledBarActionButton';
import StyledText from 'components/StyledText';
import SearchSection from './SearchSection';
import SearchContainerGrid from './SearchContainerGrid';
import StyledTextField from './StyledTextField';
import messages from './messages';
function SearchBarForm(props) {
  const { isSubmitting, dirty, isValid, searchField: { searchTypes, searchValueHintText }, showToDoSpecificFilters } = props;
  return (
    <Form>
      <SearchSection>
        <SearchContainerGrid gap="5px" columns={'30px 130px 150px 80px'}>
          <ActionSearch color={'#336666'} />
          <StyledSelectField
            fullWidth
            name="searchType"
          >
            {searchTypes && searchTypes.map((searchType) =>
              <MenuItem key={uniqueId()} value={searchType.value} primaryText={searchType.display} />,
            )}
          </StyledSelectField>
          <StyledTextField
            fullWidth
            name="searchValue"
            hintText={searchValueHintText}
          />
          <StyledBarActionButton
            fullWidth
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          >
            <FormattedMessage {...messages.searchButton} />
          </StyledBarActionButton>
        </SearchContainerGrid>
        <SearchContainerGrid gap="1px" columns="60px repeat(3,120px)" justifyContent="start">
          {!showToDoSpecificFilters &&
          <StyledText fontWeight="bold">
            <FormattedMessage {...messages.filterLabel} />
          </StyledText>
          }
          {!showToDoSpecificFilters &&
          <StyledFormikCheckbox
            name="showInactive"
            label={<FormattedMessage {...messages.includeInactive} />}
          />
          }
          {showToDoSpecificFilters &&
          <StyledText fontWeight="bold">
            <FormattedMessage {...messages.filterLabel} />
          </StyledText>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="dueToday"
              label={<FormattedMessage {...messages.status.dueToday} />}
            />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="upcoming"
              label={<FormattedMessage {...messages.status.upcoming} />}
            />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="overDue"
              label={<FormattedMessage {...messages.status.overDue} />}
            />
          </Cell>
          }
        </SearchContainerGrid>
      </SearchSection>
    </Form>
  );
}

SearchBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  showToDoSpecificFilters: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    searchValueHintText: PropTypes.node.isRequired,
  }).isRequired,
};

export default SearchBarForm;
