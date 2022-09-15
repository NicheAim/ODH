/**
 *
 * ManagePractitionerPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import merge from 'lodash/merge';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Util from 'utils/Util';
import {
  makeSelectPractitionerIdentifierSystems,
  makeSelectProviderRoles,
  makeSelectProviderSpecialties,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import {
  EMPTY_STRING,
  OCP_ADMIN_ROLE_CODE,
  PRACTITIONERIDENTIFIERSYSTEM,
  PROVIDER_ROLE,
  PROVIDER_SPECIALTY,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectOrganization, makeSelectUser } from 'containers/App/contextSelectors';
import {
  makeSelectNewPractitionerExists,
  makeSelectNewPractitionerQueryParameters,
} from 'containers/NewPractitionerResource/selectors';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManagePractitioner from 'components/ManagePractitioner';
import {
  getOrganizations,
  getPractitioner,
  initializeManagePractitioner,
  initializeOrganizations,
  savePractitioner,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectOrganizations, makeSelectPractitioner } from './selectors';
import messages from './messages';

export class ManagePractitionerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.initialSearchOrganizationResult = this.initialSearchOrganizationResult.bind(this);
    this.state = {
      currentPage: 1,
      searchValue: EMPTY_STRING,
      showInactive: false,
      searchType: 'name',
    };
  }

  componentWillMount() {
    this.props.getLookUpFormData();
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getPractitioner(logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManagePractitioner();
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({ searchValue, showInactive, searchType });
    this.props.getOrganizations(searchValue, showInactive, searchType, this.state.currentPage);
  }

  initialSearchOrganizationResult() {
    this.props.initializeOrganizations();
  }

  handlePageClick(currentPage) {
    this.setState({ currentPage });
    this.props.getOrganizations(this.state.searchValue, this.state.showInactive, this.state.searchType, currentPage);
  }

  handleSave(practitionerFormData, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(practitionerFormData, { logicalId });
    }
    this.props.onSaveForm(practitionerFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      match, uspsStates, identifierSystems, telecomSystems, telecomUses, providerRoles,
      providerSpecialties, selectedPractitioner, organizations, organizationContext, user: { role },
      newPractitionerExists, newPractitionerQueryParameters,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let practitioner = null;
    if (editMode && selectedPractitioner) {
      practitioner = selectedPractitioner;
    }

    let initialNewPractitionerValue;
    if (!editMode && newPractitionerQueryParameters) {
      const { firstName, lastName, identifierType, identifier } = newPractitionerQueryParameters;
      initialNewPractitionerValue = !newPractitionerExists && {
        firstName,
        lastName,
        identifierType,
        identifier,
      };
    }

    const isOcpAdmin = Util.equalsIgnoreCase(role, OCP_ADMIN_ROLE_CODE);

    const childProps = {
      uspsStates,
      identifierSystems,
      telecomSystems,
      telecomUses,
      providerRoles,
      providerSpecialties,
      editMode,
      practitioner,
      organizations,
      organizationContext,
      isOcpAdmin,
      initialNewPractitionerValue,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Practitioner</title>
          <meta name="description" content="Manage practitioner page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={editMode ?
            <FormattedMessage {...messages.updateHeader} /> :
            <FormattedMessage {...messages.createHeader} />}
        />
        <PageContent>
          <ManagePractitioner
            onSave={this.handleSave}
            onPageClick={this.handlePageClick}
            onSearch={this.handleSearch}
            initialSearchOrganizationResult={this.initialSearchOrganizationResult}
            {...childProps}
          />
        </PageContent>
      </Page>
    );
  }
}

ManagePractitionerPage.propTypes = {
  match: PropTypes.object,
  getLookUpFormData: PropTypes.func.isRequired,
  getPractitioner: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  identifierSystems: PropTypes.array,
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
  providerRoles: PropTypes.array,
  providerSpecialties: PropTypes.array,
  selectedPractitioner: PropTypes.object,
  onSaveForm: PropTypes.func,
  initializeManagePractitioner: PropTypes.func,
  getOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
  }),
  organizationContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.array,
    addresses: PropTypes.array,
    logicalId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }),
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  initializeOrganizations: PropTypes.func.isRequired,
  newPractitionerExists: PropTypes.bool,
  newPractitionerQueryParameters: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    identifierType: PropTypes.string,
    identifier: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  providerRoles: makeSelectProviderRoles(),
  providerSpecialties: makeSelectProviderSpecialties(),
  selectedPractitioner: makeSelectPractitioner(),
  organizations: makeSelectOrganizations(),
  organizationContext: makeSelectOrganization(),
  user: makeSelectUser(),
  newPractitionerQueryParameters: makeSelectNewPractitionerQueryParameters(),
  newPractitionerExists: makeSelectNewPractitionerExists(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManagePractitioner: () => dispatch(initializeManagePractitioner()),
    initializeOrganizations: () => dispatch(initializeOrganizations()),
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, PRACTITIONERIDENTIFIERSYSTEM, TELECOMSYSTEM, TELECOMUSE, PROVIDER_ROLE, PROVIDER_SPECIALTY])),
    onSaveForm: (practitionerFormData, handleSubmitting) => dispatch(savePractitioner(practitionerFormData, handleSubmitting)),
    getPractitioner: (logicalId) => dispatch(getPractitioner(logicalId)),
    getOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(getOrganizations(searchValue, showInactive, searchType, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePractitionerPage', reducer });
const withSaga = injectSaga({ key: 'managePractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePractitionerPage);
