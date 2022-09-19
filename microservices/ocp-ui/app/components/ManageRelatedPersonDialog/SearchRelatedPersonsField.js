import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';

import InfoSection from 'components/InfoSection';
import TextField from 'components/TextField';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

function SearchRelatedPersonsField(props) {
  const { onSearch } = props;
  const minimumLength = 3;
  return (
    <InfoSection>
      <Formik
        onSubmit={(values, actions) => {
          const { searchTerms } = values;
          onSearch(searchTerms);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          searchTerms: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
        })}
        render={(formikProps) => {
          const { isSubmitting, dirty, isValid } = formikProps;
          return (
            <Form>
              <FieldGroupGrid gap="10px">
                <PrefixCell>
                  <TextField
                    name="searchTerms"
                    fullWidth
                    hintText={<FormattedMessage {...messages.relatedPersonNameHintText} />}
                  />
                </PrefixCell>
                <MainCell>
                  <StyledRaisedButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
                    <FormattedMessage {...messages.searchButton} />
                  </StyledRaisedButton>
                </MainCell>
              </FieldGroupGrid>
            </Form>
          );
        }}
      />
    </InfoSection>
  );
}

SearchRelatedPersonsField.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchRelatedPersonsField;
