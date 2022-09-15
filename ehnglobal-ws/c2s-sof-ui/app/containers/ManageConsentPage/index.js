/**
 *
 * ManageConsentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isUndefined from 'lodash/isUndefined';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getLookupsAction } from 'containers/App/actions';
import {
  makeSelectConsentStateCodes,
  makeSelectPurposeOfUse,
  makeSelectSecurityLabel,
} from 'containers/App/lookupSelectors';
import { makeSelectOrganizations, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { CONSENT_STATE_CODES, PURPOSE_OF_USE, SECURITY_LABEL } from 'containers/App/constants';
import ManageConsent from 'components/ManageConsent';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import merge from 'lodash/merge';
import reducer from './reducer';
import saga from './saga';
import { getConsent, saveConsent } from './actions';
import { makeSelectConsent } from './selectors';
import { initialConsentFormValues, mapResourceName } from './helpers';


export class ManageConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const consentId = this.props.match.params.id;
    if (consentId) {
      this.props.getConsent(consentId);
    }
  }

  handleSave(consentFormData, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(consentFormData, { logicalId });
    }
    this.props.saveConsent(consentFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      patient,
      user,
      organizations,
      consentStateCodes,
      securityLabels,
      purposeOfUse,
      match,
      selectedConsent,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let consent = null;
    if (editMode && selectedConsent) {
      consent = selectedConsent;
    }

    let careCoordinatorContext = null;
    if (user && !user.isPatient) {
      careCoordinatorContext = {
        logicalId: user.fhirResource.logicalId,
        name: mapResourceName(user.fhirResource.name),
        identifiers: user.fhirResource.identifiers,
        organizations,
      };
    }
    const consentProps = {
      patient,
      careCoordinatorContext,
      consentStateCodes,
      securityLabels,
      purposeOfUse,
      editMode,
      consent,
    };
    return (
      <Page color="secondary">
        <Helmet>
          <title> Manage Consent </title>
          <meta name="description" content="Manage Consent page of Consent2Share Smart On Fhir" />
        </Helmet>
        {patient &&
        <PageHeader title={`I, ${mapResourceName(patient.name)}, hereby authorize`} />
        }
        <PageContent>
          <ManageConsent
            {...consentProps}
            onSave={this.handleSave}
            initialConsentFormValues={initialConsentFormValues}
          />
        </PageContent>
      </Page>
    );
  }
}

ManageConsentPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  getConsent: PropTypes.func.isRequired,
  consentStateCodes: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  match: PropTypes.object.isRequired,
  selectedConsent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.date,
      end: PropTypes.date,
    }),
  }),
  saveConsent: PropTypes.func,
  user: PropTypes.shape({
    isPatient: PropTypes.bool.isRequired,
    fhirResource: PropTypes.shape({
      logicalId: PropTypes.string,
      name: PropTypes.array,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
    }),
  }),
  organizations: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
  })),
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  organizations: makeSelectOrganizations(),
  patient: makeSelectPatient(),
  consentStateCodes: makeSelectConsentStateCodes(),
  securityLabels: makeSelectSecurityLabel(),
  purposeOfUse: makeSelectPurposeOfUse(),
  selectedConsent: makeSelectConsent(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([CONSENT_STATE_CODES, SECURITY_LABEL, PURPOSE_OF_USE])),
    getConsent: (consentId) => dispatch(getConsent(consentId)),
    saveConsent: (consentFormData, handleSubmitting) => dispatch(saveConsent(consentFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageConsentPage', reducer });
const withSaga = injectSaga({ key: 'manageConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageConsentPage);
