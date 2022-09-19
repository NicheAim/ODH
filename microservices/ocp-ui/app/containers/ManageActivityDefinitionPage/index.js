/**
 *
 * ManageActivityDefinitionPage
 *
 */

import find from 'lodash/find';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import {
  ACTION_PARTICIPANT_ROLE,
  ACTION_PARTICIPANT_TYPE,
  DEFINITION_TOPIC,
  PUBLICATION_STATUS,
  RELATED_ARTIFACT_TYPE,
  RESOURCE_TYPE,
} from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  makeSelectActionParticipantRoles,
  makeSelectActionParticipantTypes,
  makeSelectDefinitionTopics,
  makeSelectPublicationStatuses,
  makeSelectRelatedArtifactTypes,
  makeSelectResourceTypes,
} from 'containers/App/lookupSelectors';
import ManageActivityDefinition from 'components/ManageActivityDefinition';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import { getActivityDefinition, saveActivityDefinition } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectActivityDefinition } from './selectors';
import { initialActivityDefinitionFormValues } from './helpers';

export class ManageActivityDefinitionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const activityDefinitionId = this.props.match.params.id;
    if (activityDefinitionId) {
      this.props.getActivityDefinition(activityDefinitionId);
    }
  }

  handleSave(activityDefinitionFormData, actions) {
    const activityDefinitionId = this.props.match.params.id;
    if (activityDefinitionId) {
      merge(activityDefinitionFormData, { activityDefinitionId });
    }
    let code;

    const { statusCode } = activityDefinitionFormData;
    if (!isUndefined(statusCode)) {
      code = statusCode;
      const selectedCode = find(this.props.publicationStatuses, { code });
      merge(activityDefinitionFormData, { status: selectedCode });
    }

    const { topicCode } = activityDefinitionFormData;
    if (!isUndefined(topicCode)) {
      code = topicCode;
      const selectedTopic = find(this.props.definitionTopics, { code });
      merge(activityDefinitionFormData, { topic: selectedTopic });
    }

    const { kindCode } = activityDefinitionFormData;
    if (!isUndefined(kindCode)) {
      code = kindCode;
      const selectedKind = find(this.props.resourceTypes, { code });
      merge(activityDefinitionFormData, { kind: selectedKind });
    }

    const { participantTypeCode } = activityDefinitionFormData;
    if (!isUndefined(participantTypeCode)) {
      code = participantTypeCode;
      const selectedParticipantType = find(this.props.actionParticipantTypes, { code });
      merge(activityDefinitionFormData, { actionParticipantType: selectedParticipantType });
    }

    const { participantRoleCode } = activityDefinitionFormData;
    if (!isUndefined(participantRoleCode)) {
      code = participantRoleCode;
      const selectedParticipantRole = find(this.props.actionParticipantRoles, { code });
      merge(activityDefinitionFormData, { actionParticipantRole: selectedParticipantRole });
    }
    this.props.saveActivityDefinition(activityDefinitionFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      match,
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
      relatedArtifactTypes,
      organization,
      activityDefinition,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let selectedActivityDefinition = null;
    if (editMode && activityDefinition) {
      selectedActivityDefinition = activityDefinition;
    }
    const activityDefinitionProps = {
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
      relatedArtifactTypes,
      organization,
      editMode,
      selectedActivityDefinition,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Activity Definition</title>
          <meta name="description" content="Manage ActivityDefinition page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={editMode ?
            <FormattedMessage {...messages.editHeader} /> :
            <FormattedMessage {...messages.createHeader} />
          }
        />
        <PageContent>
          <ManageActivityDefinition
            {...activityDefinitionProps}
            onSave={this.handleSave}
            initialActivityDefinitionFormValues={initialActivityDefinitionFormValues}
          />
        </PageContent>
      </Page>
    );
  }
}

ManageActivityDefinitionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  getLookups: PropTypes.func.isRequired,
  publicationStatuses: PropTypes.array,
  definitionTopics: PropTypes.array,
  resourceTypes: PropTypes.array,
  actionParticipantTypes: PropTypes.array,
  actionParticipantRoles: PropTypes.array,
  relatedArtifactTypes: PropTypes.array,
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }),
  activityDefinition: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    version: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    date: PropTypes.string,
    publisher: PropTypes.string,
    description: PropTypes.string,
    effectivePeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    topic: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    relatedArtifact: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    })),
    kind: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    timing: PropTypes.shape({
      durationMax: PropTypes.number,
      frequency: PropTypes.number,
    }),
    actionParticipantType: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    actionParticipantRole: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
  }),
  getActivityDefinition: PropTypes.func.isRequired,
  saveActivityDefinition: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  publicationStatuses: makeSelectPublicationStatuses(),
  definitionTopics: makeSelectDefinitionTopics(),
  resourceTypes: makeSelectResourceTypes(),
  actionParticipantTypes: makeSelectActionParticipantTypes(),
  actionParticipantRoles: makeSelectActionParticipantRoles(),
  relatedArtifactTypes: makeSelectRelatedArtifactTypes(),
  organization: makeSelectOrganization(),
  activityDefinition: makeSelectActivityDefinition(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([PUBLICATION_STATUS, DEFINITION_TOPIC, RESOURCE_TYPE, ACTION_PARTICIPANT_TYPE, ACTION_PARTICIPANT_ROLE, RELATED_ARTIFACT_TYPE])),
    getActivityDefinition: (activityDefinitionId) => dispatch(getActivityDefinition(activityDefinitionId)),
    saveActivityDefinition: (activityDefinitionFormData, handleSubmitting) => dispatch(saveActivityDefinition(activityDefinitionFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageActivityDefinitionPage', reducer });
const withSaga = injectSaga({ key: 'manageActivityDefinitionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageActivityDefinitionPage);
