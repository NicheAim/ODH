import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import messages from './messages';

function AddArtifactsForm(props) {
  const {
    relatedArtifactTypes,
    initialValues,
    onAddArtifact,
    onRemoveArtifact,
    handleCloseDialog,
  } = props;

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveArtifact(initialValues.index);
          }
          onAddArtifact(values);
          handleCloseDialog();
        }}
        initialValues={{ ...(initialValues || {}).artifact }}
        validationSchema={yup.object().shape({
          display: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          type: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Grid columns="repeat(2, 1fr)">
              <Cell>
                <TextField
                  fullWidth
                  name="display"
                  hintText={<FormattedMessage {...messages.hintText.display} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.display} />}
                />
              </Cell>
              <Cell>
                <SelectField
                  fullWidth
                  name="type"
                  hintText={<FormattedMessage {...messages.hintText.type} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.type} />}
                >
                  {relatedArtifactTypes && relatedArtifactTypes.map((artifactType) =>
                    <MenuItem key={artifactType.code} value={artifactType.code} primaryText={artifactType.display} />,
                  )}
                </SelectField>
              </Cell>
              <Cell>
              </Cell>
            </Grid>
            <Grid columns="150px 150px">
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  fullWidth
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveArtifactButton} />
                </StyledRaisedButton>
              </Cell>
              <Cell>
                <StyledFlatButton type="reset" fullWidth onClick={handleCloseDialog}>
                  <FormattedMessage {...messages.cancelButton} />
                </StyledFlatButton>
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

AddArtifactsForm.propTypes = {
  onAddArtifact: PropTypes.func.isRequired,
  onRemoveArtifact: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    artifact: PropTypes.object.isRequired,
  }),
  relatedArtifactTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
};

export default AddArtifactsForm;
