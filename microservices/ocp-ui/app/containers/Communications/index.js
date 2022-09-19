/**
 *
 * Communication
 *
 */

import Card from 'components/Card';
import CommunicationsTable from 'components/CommunicationsTable';
import PanelToolbar from 'components/PanelToolbar';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_COMMUNICATION_URL,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';

import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import { getCommunications } from 'containers/Communications/actions';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectCommunications from './selectors';

export class Communications extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onSize = this.onSize.bind(this);
  }

  componentDidMount() {
    const { selectedPatient, organization } = this.props;
    if (selectedPatient && organization) {
      this.props.getCommunications(DEFAULT_START_PAGE_NUMBER, organization.logicalId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedPatient } = this.props;
    const { selectedPatient: newPatient } = nextProps;
    if (!isEqual(selectedPatient, newPatient)) {
      this.props.getCommunications(DEFAULT_START_PAGE_NUMBER);
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handlePageClick(pageNumber) {
    this.props.getCommunications(pageNumber);
  }

  render() {
    const { communications, selectedPatient } = this.props;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_COMMUNICATION_URL,
    };
    const communicationsData = {
      manageCommunicationBaseUrl: MANAGE_COMMUNICATION_URL,
      selectedPatient,
      loading: communications.loading,
      data: communications.data,
    };
    return (
      <Card>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE]}
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          onSize={this.onSize}
        />
        <CommunicationsTable
          relativeTop={this.state.relativeTop}
          communicationsData={communicationsData}
          handleChangePage={this.handlePageClick}
        />
      </Card>
    );
  }
}

Communications.propTypes = {
  getCommunications: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  communications: PropTypes.shape({
    data: PropTypes.shape({
      currentPage: PropTypes.number,
      totalNumberOfPages: PropTypes.number,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      elements: PropTypes.array,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  communications: makeSelectCommunications(),
  selectedPatient: makeSelectPatient(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCommunications: (pageNumber, organizationId) => dispatch(getCommunications(pageNumber, organizationId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'communications', reducer });
const withSaga = injectSaga({ key: 'communications', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Communications);
