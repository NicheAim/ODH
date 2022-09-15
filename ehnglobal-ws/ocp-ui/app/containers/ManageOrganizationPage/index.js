/**
 *
 * ManageOrganizationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import {
  CONTACTPURPOSE,
  ORGANIZATIONIDENTIFIERSYSTEM,
  ORGANIZATIONSTATUS,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import {
  makeSelectContactPurpose,
  makeSelectOrganizationIdentifierSystems,
  makeSelectOrganizationStatuses,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { getOrganization } from 'containers/App/contextActions';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManageOrganization from 'components/ManageOrganization';
import { createOrganization, updateOrganization } from './actions';
import saga from './saga';
import { mapToFrontendContacts } from './helpers';
import messages from './messages';


export class ManageOrganizationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const { match: { params: { id } }, organization } = this.props;
    if ((id && !organization) || (id && organization && organization.logicalId && organization.logicalId !== id)) {
      this.props.getOrganization(id);
    }
  }

  handleSubmitCreate(values, actions) {
    this.props.createOrganization(values, () => actions.setSubmitting(false));
  }

  handleSubmitUpdate(values, actions) {
    const { match: { params: { id } } } = this.props;
    this.props.updateOrganization(id, values, () => {
      actions.setSubmitting(false);
      this.props.getOrganization(id);
    });
  }

  render() {
    const { match: { params: { id } }, uspsStates, organizationIdentifierSystems, organizationStatuses, telecomSystems, telecomUses, contactPurposes, organization } = this.props;
    let initialValues = {};
    let editingOrganization = null;
    // if id in the route exists but no initial data to edit
    if (id && organization && organization.logicalId && organization.logicalId === id) {
      editingOrganization = organization;
    }
    if (editingOrganization) {
      const {
        name,
        identifiers: [{ system: identifierSystem, value: identifierValue }],
        addresses,
        telecoms,
        contacts,
        active,
      } = editingOrganization;
      initialValues = {
        name,
        status: active.toString(),
        identifierSystem,
        identifierValue,
        telecoms,
        addresses,
        contacts: mapToFrontendContacts(contacts),
      };
    }

    return (
      <Page>
        <Helmet>
          <title>Manage Organization</title>
          <meta name="description" content="Manage Organization page of Omnibus Care Plan application" />
        </Helmet>
        {((id && editingOrganization) || !id) &&
        <div>
          <PageHeader
            title={editingOrganization ?
              <FormattedMessage {...messages.updateModeTitle} /> :
              <FormattedMessage {...messages.createModeTitle} />}
          />
          <PageContent>
            <ManageOrganization
              id={id}
              initialValues={initialValues}
              editingOrganization={editingOrganization}
              uspsStates={uspsStates}
              organizationIdentifierSystems={organizationIdentifierSystems}
              organizationStatuses={organizationStatuses}
              telecomSystems={telecomSystems}
              telecomUses={telecomUses}
              contactPurposes={contactPurposes}
              onSubmitCreate={this.handleSubmitCreate}
              onSubmitUpdate={this.handleSubmitUpdate}
            />
          </PageContent>
        </div>
        }
      </Page>
    );
  }
}

ManageOrganizationPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  createOrganization: PropTypes.func.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationIdentifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })),
  contactPurposes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  organization: PropTypes.shape({
    active: PropTypes.bool,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      postalCode: PropTypes.string,
      stateCode: PropTypes.string,
      use: PropTypes.string,
    })),
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      display: PropTypes.string,
      oid: PropTypes.string,
      priority: PropTypes.number,
    })),
    logicalId: PropTypes.string,
    name: PropTypes.string,
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  organizationIdentifierSystems: makeSelectOrganizationIdentifierSystems(),
  organizationStatuses: makeSelectOrganizationStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  contactPurposes: makeSelectContactPurpose(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, TELECOMSYSTEM, TELECOMUSE, CONTACTPURPOSE, ORGANIZATIONIDENTIFIERSYSTEM, ORGANIZATIONSTATUS])),
    createOrganization: (organization, callback) => dispatch(createOrganization(organization, callback)),
    updateOrganization: (id, organization, callback) => dispatch(updateOrganization(id, organization, callback)),
    getOrganization: (logicalId) => dispatch(getOrganization(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageOrganizationPage', saga });

export default compose(
  withSaga,
  withConnect,
)(ManageOrganizationPage);
