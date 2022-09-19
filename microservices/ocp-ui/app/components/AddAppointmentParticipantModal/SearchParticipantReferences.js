import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import { Cell, Grid } from 'styled-css-grid';

import Padding from 'components/Padding';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import messages from './messages';

function SearchParticipantReferences(props) {
  const minimumLength = 3;
  return (
    <Formik
      onSubmit={(values, actions) => {
        const { searchType, searchValue } = values;
        props.onSearchParticipantReferences(searchType, searchValue, actions);
      }}
      validationSchema={yup.object().shape({
        searchType: yup.string()
          .required((<FormattedMessage {...messages.validation.required} />)),
        searchValue: yup.string()
          .when('searchType', {
            is: 'practitioner',  // alternatively: (val) => val == true
            then: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(minimumLength,
                (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
            otherwise: null,
          }),
      })}
      render={(formikProps) => {
        const { isSubmitting, dirty, isValid } = formikProps;
        return (
          <Form>
            <Grid columns={3}>
              <Cell>
                <TextField
                  fullWidth
                  name="searchValue"
                  hintText={<FormattedMessage {...messages.hintText.participantName} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantName} />}
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="searchType"
                  hintText={<FormattedMessage {...messages.hintText.participantType} />}
                  floatingLabelText={
                    <FormattedMessage {...messages.floatingLabelText.participantType} />}
                >
                  <MenuItem
                    value="practitioner"
                    primaryText={<FormattedMessage {...messages.menuItemPractitioner} />}
                  />
                  <MenuItem
                    value="relatedPerson"
                    primaryText={<FormattedMessage {...messages.menuItemRelatedPerson} />}
                  />
                </SelectField>
              </Cell>
              <Cell>
                <StyledTooltip placement="right" title={<FormattedMessage {...messages.searchTooltip} />}>
                  <Padding top={30}>
                    <StyledIconButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
                      <SearchIcon />
                    </StyledIconButton>
                  </Padding>
                </StyledTooltip>
              </Cell>
            </Grid>
          </Form>
        );
      }}
    />
  );
}

SearchParticipantReferences.propTypes = {
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default SearchParticipantReferences;
