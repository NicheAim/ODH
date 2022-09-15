/**
 *
 * RevokeConsentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import RevokeConsent from 'components/RevokeConsent';
import { getConsent, initializeRevokeConsentPage, revokeConsent } from './actions';
import { makeSelectConsent, makeSelectSubmitting } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class RevokeConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleRevokeConsent = this.handleRevokeConsent.bind(this);
  }

  componentDidMount() {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getConsent(logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeRevokeConsentPage();
  }

  handleRevokeConsent() {
    this.props.revokeConsent(this.props.match.params.id);
  }

  render() {
    const { consent, patient, isSubmitting } = this.props;
    return (
      <Page color="secondary">
        <Helmet>
          <title>RevokeConsentPage</title>
          <meta name="description" content="Revoke consent page of Consent2Share Smart On Fhir" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <RevokeConsent
            consent={consent}
            patient={patient}
            isSubmitting={isSubmitting}
            onRevokeConsent={this.handleRevokeConsent}
          />
        </PageContent>
      </Page>
    );
  }
}

RevokeConsentPage.propTypes = {
  match: PropTypes.object.isRequired,
  initializeRevokeConsentPage: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  getConsent: PropTypes.func.isRequired,
  revokeConsent: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  consent: makeSelectConsent(),
  patient: makeSelectPatient(),
  isSubmitting: makeSelectSubmitting(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeRevokeConsentPage: () => dispatch(initializeRevokeConsentPage()),
    getConsent: (logicalId) => dispatch(getConsent(logicalId)),
    revokeConsent: (logicalId) => dispatch(revokeConsent(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'revokeConsentPage', reducer });
const withSaga = injectSaga({ key: 'revokeConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RevokeConsentPage);
