import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import TextLabelGroup from 'components/TextLabelGroup';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import AddArtifacts from 'components/AddArtifacts';
import ManageActivityDefinitionFormGrid from './ManageActivityDefinitionFormGrid';
import messages from './messages';

function ManageActivityDefinitionForm(props) {
  const {
    organizationName,
    lastPublishDate,
    publicationStatuses,
    definitionTopics,
    resourceTypes,
    actionParticipantTypes,
    actionParticipantRoles,
    relatedArtifactTypes,
    isSubmitting, dirty, isValid, errors,
    values,
  } = props;

  const addArtifactsProps = {
    relatedArtifactTypes,
    errors,
    relatedArtifact: values.relatedArtifact,
  };

  const today = new Date();

  return (
    <Form>
      <ManageActivityDefinitionFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="version">
          <TextField
            fullWidth
            name="version"
            hintText={<FormattedMessage {...messages.hintText.version} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.version} />}
          />
        </Cell>
        <Cell area="selectedOrganization">
          <TextLabelGroup
            label={<FormattedMessage {...messages.organizationNameLabel} />}
            text={organizationName}
          />
        </Cell>
        <Cell area="systemName">
          <TextField
            fullWidth
            name="name"
            hintText={<FormattedMessage {...messages.hintText.systemName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.systemName} />}
          />
        </Cell>
        <Cell area="displayName">
          <TextField
            fullWidth
            name="title"
            hintText={<FormattedMessage {...messages.hintText.displayName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.displayName} />}
          />
        </Cell>
        <Cell area="status">
          <SelectField
            fullWidth
            name="statusCode"
            hintText={<FormattedMessage {...messages.hintText.status} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
          >
            {publicationStatuses && publicationStatuses.map((status) =>
              <MenuItem key={status.code} value={status.code} primaryText={status.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="description">
          <TextField
            fullWidth
            name="description"
            hintText={<FormattedMessage {...messages.hintText.description} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
          />
        </Cell>
        {lastPublishDate &&
        <Cell area="lastPublishDate">
          <TextLabelGroup
            label={<FormattedMessage {...messages.lastPublishDateLabel} />}
            text={lastPublishDate || ''}
          />
        </Cell>
        }
        <Cell area="effectivePeriodStart">
          <DatePicker
            fullWidth
            name="effectiveStart"
            mode="landscape"
            minDate={today}
            hintText={<FormattedMessage {...messages.hintText.effectiveStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.effectiveStart} />}
          />
        </Cell>
        <Cell area="effectivePeriodEnd">
          <DatePicker
            fullWidth
            name="effectiveEnd"
            minDate={today}
            mode="landscape"
            hintText={<FormattedMessage {...messages.hintText.effectiveEnd} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.effectiveEnd} />}
          />
        </Cell>
        <Cell area="topic">
          <SelectField
            fullWidth
            name="topicCode"
            hintText={<FormattedMessage {...messages.hintText.topic} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.topic} />}
          >
            {definitionTopics && definitionTopics.map((topic) =>
              <MenuItem key={topic.code} value={topic.code} primaryText={topic.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="kind">
          <SelectField
            fullWidth
            name="kindCode"
            hintText={<FormattedMessage {...messages.hintText.resourceType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.resourceType} />}
          >
            {resourceTypes && resourceTypes.map((kind) =>
              <MenuItem key={kind.code} value={kind.code} primaryText={kind.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="activityParticipantSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.activityParticipantSubtitle} />
          </FormSubtitle>
        </Cell>
        <Cell area="participantType">
          <SelectField
            fullWidth
            name="participantTypeCode"
            hintText={<FormattedMessage {...messages.hintText.participantType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantType} />}
          >
            {actionParticipantTypes && actionParticipantTypes.map((type) =>
              <MenuItem key={type.code} value={type.code} primaryText={type.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="participantRole">
          <SelectField
            fullWidth
            name="participantRoleCode"
            hintText={<FormattedMessage {...messages.hintText.participantRole} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantRole} />}
          >
            {actionParticipantRoles && actionParticipantRoles.map((role) =>
              <MenuItem key={role.code} value={role.code} primaryText={role.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="setOccurrenceSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.setOccurrenceSubtitle} />
          </FormSubtitle>
        </Cell>
        <Cell area="duration">
          <TextField
            fullWidth
            name="duration"
            hintText={<FormattedMessage {...messages.hintText.duration} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.duration} />}
          />
        </Cell>
        <Cell area="frequency">
          <TextField
            fullWidth
            name="frequency"
            hintText={<FormattedMessage {...messages.hintText.frequency} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.frequency} />}
          />
        </Cell>
        <Cell area="relatedArtifactsSection">
          <AddArtifacts {...addArtifactsProps} />
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Save
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
      </ManageActivityDefinitionFormGrid>
    </Form>
  );
}

ManageActivityDefinitionForm.propTypes = {
  organizationName: PropTypes.string.isRequired,
  lastPublishDate: PropTypes.string,
  publicationStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  definitionTopics: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  resourceTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  actionParticipantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  actionParticipantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  relatedArtifactTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  values: PropTypes.object,
};

export default ManageActivityDefinitionForm;
