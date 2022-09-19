/**
 *
 * AssignHealthCareServiceToLocationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Dialog from 'material-ui/Dialog';

import { flattenHealthcareServiceData } from 'containers/HealthcareServices/helpers';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import HealthcareServiceTable from 'components/HealthcareServiceTable';
import StyledFlatButton from 'components/StyledFlatButton';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import InlineLabel from 'components/InlineLabel';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import H3 from 'components/H3';
import InfoSection from 'components/InfoSection';
import { makeSelectLocations } from 'containers/Locations/selectors';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  getHealthcareServicesLocationAssignment,
  initializeAssignHealthCareServiceToLocationPage,
  markHealthcareServiceAsAssigned,
  unassignHealthcareServicesLocationAssignment,
  updateHealthcareServicesLocationAssignment,
} from './actions';

export class AssignHealthCareServiceToLocationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      open: false,
      selectedHealthCareServiceName: '',
      selectedLocationName: '',
      healthcareServiceLogicalId: '',
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onCheckAssignedCheckbox = this.onCheckAssignedCheckbox.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleUnassignHealthcareService = this.handleUnassignHealthcareService.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LOCATION_NAME_HTML_ID = uniqueId('location_name_');
  }

  componentDidMount() {
    this.props.initializeAssignHealthCareServiceToLocationPage();
    this.props.getHealthcareServicesLocationAssignment(DEFAULT_START_PAGE_NUMBER);
  }

  onCheckAssignedCheckbox(evt, checked, healthcareServiceLogicalId) {
    const locationLogicalId = this.props.match.params.id;
    if (checked) {
      this.props.updateHealthcareServicesLocationAssignment(healthcareServiceLogicalId);
    } else {
      const selectedLocation = find(this.props.location, { logicalId: locationLogicalId });
      const selectedHealthcareService = find(this.props.healthcareServices, { logicalId: healthcareServiceLogicalId });
      this.setState({ selectedHealthCareServiceName: selectedHealthcareService.name });
      this.setState({ healthcareServiceLogicalId });
      this.setState({ selectedLocationName: selectedLocation.name });
      this.setState({ open: true });
    }
  }

  handleCloseDialog() {
    this.props.markHealthcareServiceAsAssigned(this.state.healthcareServiceLogicalId);
    this.setState({ open: false });
  }

  handlePageClick(currentPage) {
    this.props.getHealthcareServicesLocationAssignment(this.props.organization.logicalId, this.props.organization.name, this.props.match.params.id, currentPage);
  }

  handleUnassignHealthcareService() {
    this.props.unassignHealthcareServicesLocationAssignment(this.state.healthcareServiceLogicalId);
    this.setState({ open: false });
  }

  render() {
    const logicalId = this.props.match.params.id;
    const selectedLocation = find(this.props.location, { logicalId });
    const { loading, healthcareServices, organization } = this.props;
    const actions = [
      <StyledFlatButton onClick={this.handleCloseDialog}>
        <FormattedMessage {...messages.dialogButtonLabelCancel} />
      </StyledFlatButton>,
      <StyledFlatButton keyboardFocused onClick={this.handleUnassignHealthcareService}>
        <FormattedMessage {...messages.dialogButtonLabelSubmit} />
      </StyledFlatButton>,
    ];
    return (
      <Page>
        <Helmet>
          <title>Assign Healthcare Service To the Location</title>
          <meta name="description" content="Assign the selected Healthcare Service to the Location" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          {isEmpty(organization) &&
          <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}
          {organization && selectedLocation && <div>
            <InfoSection>
              <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
                <FormattedMessage {...messages.labelOrganization} />&nbsp;
              </InlineLabel>
              <span id={this.ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>
            </InfoSection>
            <InfoSection>
              <InlineLabel htmlFor={this.LOCATION_NAME_HTML_ID}>
                <FormattedMessage {...messages.labelLocation} />&nbsp;
              </InlineLabel>
              <span id={this.LOCATION_NAME_HTML_ID}>{selectedLocation.name}</span>
            </InfoSection>
          </div>
          }

          {loading &&
          <RefreshIndicatorLoading />}

          {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
          <NoResultsFoundText>
            <FormattedMessage {...messages.noHealthcareServicesFound} />
          </NoResultsFoundText>
          }

          {!loading && !isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
          <div>
            <CenterAlign>
              <HealthcareServiceTable
                elements={healthcareServices}
                showAssigned
                onCheck={this.onCheckAssignedCheckbox}
                flattenHealthcareServiceData={flattenHealthcareServiceData}
              />
            </CenterAlign>
            <CenterAlignedUltimatePagination
              currentPage={this.props.currentPage}
              totalPages={this.props.totalPages}
              onChange={this.handlePageClick}
            />
          </div>
          }
        </PageContent>
        <Dialog
          title={<H3><FormattedMessage {...messages.dialogTitleUnassignHealthcareService} /></H3>}
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleCloseDialog}
        >
          <FormattedMessage
            {...messages.confirmLocationUnassignment}
            values={{
              selectedHealthCareServiceName: <strong>{this.state.selectedHealthCareServiceName} </strong>,
              selectedLocationName: <strong>{this.state.selectedLocationName} </strong>,
            }}
          />
        </Dialog>
      </Page>
    );
  }
}

AssignHealthCareServiceToLocationPage.propTypes = {
  match: PropTypes.object,
  getHealthcareServicesLocationAssignment: PropTypes.func,
  initializeAssignHealthCareServiceToLocationPage: PropTypes.func,
  updateHealthcareServicesLocationAssignment: PropTypes.func,
  markHealthcareServiceAsAssigned: PropTypes.func,
  unassignHealthcareServicesLocationAssignment: PropTypes.func,
  healthcareServices: PropTypes.array,
  organization: PropTypes.object,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  location: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  location: makeSelectLocations(),
  loading: makeSelectQueryLoading(),
  error: makeSelectQueryError(),
  currentPage: makeSelectCurrentPage(),
  totalPages: makeSelectTotalNumberOfPages(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeAssignHealthCareServiceToLocationPage: () => dispatch(initializeAssignHealthCareServiceToLocationPage()),
    getHealthcareServicesLocationAssignment: (currentPage) => dispatch(getHealthcareServicesLocationAssignment(currentPage)),
    updateHealthcareServicesLocationAssignment: (healthcareServiceId) => dispatch(updateHealthcareServicesLocationAssignment(healthcareServiceId)),
    unassignHealthcareServicesLocationAssignment: (healthcareServiceId) => dispatch(unassignHealthcareServicesLocationAssignment(healthcareServiceId)),
    markHealthcareServiceAsAssigned: (healthcareServiceId) => dispatch(markHealthcareServiceAsAssigned(healthcareServiceId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'assignHealthCareServiceToLocationPage', reducer });
const withSaga = injectSaga({ key: 'assignHealthCareServiceToLocationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssignHealthCareServiceToLocationPage);
