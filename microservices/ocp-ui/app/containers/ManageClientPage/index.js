/**
 *
 * ManageClientPage
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
import injectReducer from 'utils/injectReducer';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import ManageClient from 'components/ManageClient';
import { makeSelectSmartApps } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { saveClient, getClients, deleteClient } from './actions';

export class ManageClientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSaveClient = this.handleSaveClient.bind(this);
    this.handleDeleteClient = this.handleDeleteClient.bind(this);
  }

  componentDidMount() {
    this.props.getClients();
  }

  handleSaveClient(clientFormData, actions) {
    this.props.onSaveForm(clientFormData, () => {
      actions.setSubmitting(false);
    });
  }

  handleDeleteClient(clientId) {
    this.props.deleteClient(clientId);
  }

  render() {
    const { smartApps } = this.props;
    return (
      <Page>
        <Helmet>
          <title>Manage SMART apps</title>
          <meta name="description" content="Description of Manage SMART applications" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <ManageClient
            onSaveClient={this.handleSaveClient}
            onDeleteClient={this.handleDeleteClient}
            smartApps={smartApps}
          />
        </PageContent>
      </Page>
    );
  }
}

ManageClientPage.propTypes = {
  onSaveForm: PropTypes.func,
  getClients: PropTypes.func,
  deleteClient: PropTypes.func,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  smartApps: makeSelectSmartApps(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveForm: (clientFormData, handleSubmitting) => {
      dispatch(saveClient(clientFormData, handleSubmitting));
    },
    getClients: () => dispatch(getClients()),
    deleteClient: (clientId) => dispatch(deleteClient(clientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageClientPage', reducer });
const withSaga = injectSaga({ key: 'manageClientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageClientPage);
