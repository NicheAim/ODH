/**
 *
 * Coverages
 *
 */

import AddCoverageDialog from 'components/AddCoverageDialog';
import CoverageTable from 'components/CoverageTable';
import PanelToolbar from 'components/PanelToolbar';
import { getLookupsAction } from 'containers/App/actions';
import {
  BENEFITS_SPECIALIST_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  COVERAGE_TYPE,
  DEFAULT_START_PAGE_NUMBER,
  FM_STATUS,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  POLICYHOLDER_RELATIONSHIP,
} from 'containers/App/constants';
import { getSubscriberOptions } from 'containers/App/contextActions';
import {
  makeSelectPatient,
  makeSelectSubscriptionOptions,
} from 'containers/App/contextSelectors';
import {
  composePatientReference,
  getPatientFullName,
} from 'containers/App/helpers';
import {
  makeSelectCoverageFmStatus,
  makeSelectCoverageType,
  makeSelectPolicyHolderRelationship,
} from 'containers/App/lookupSelectors';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getCoverageAction, getSaveCoverageAction } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCoverageLoading, makeSelectCoverages } from './selectors';

export class Coverages extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSaveCoverage = this.handleSaveCoverage.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    const { patient } = this.props;
    this.props.getLookups();
    this.props.getCoverages(DEFAULT_START_PAGE_NUMBER);
    this.props.getSubscriberOptions(patient.id);
  }

  handlePageClick(pageNumber) {
    this.props.getCoverages(pageNumber);
  }

  handleClick() {
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  handleSaveCoverage(coverageData, actions) {
    const mappedCoverageData = {
      ...coverageData,
      startDate:
        coverageData.startDate &&
        moment(coverageData.startDate, 'DD/MM/YYYY').format('MM/DD/YYYY'),
      endDate:
        coverageData.startDate &&
        moment(coverageData.endDate, 'DD/MM/YYYY').format('MM/DD/YYYY'),
    };
    this.props.onSaveCoverage(mappedCoverageData, () =>
      actions.setSubmitting(false)
    );
    this.setState({ open: false });
  }

  render() {
    const {
      coverageType,
      coverageFmStatus,
      policyHolderRelationship,
      subscriptionOptions,
      patient,
      data,
      loading,
    } = this.props;
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        onClick: this.handleClick,
      },
    };

    const addCoverageDialogProps = {
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      patient,
      open: this.state.open,
      handleDialogClose: this.handleDialogClose,
      handleSaveCoverage: this.handleSaveCoverage,
      composePatientReference,
      getPatientFullName,
    };

    return (
      <div>
        <PanelToolbar
          {...addNewItem}
          allowedAddNewItemRoles={[
            CARE_MANAGER_ROLE_CODE,
            CARE_COORDINATOR_ROLE_CODE,
            ORGANIZATION_ADMIN_ROLE_CODE,
            BENEFITS_SPECIALIST_ROLE_CODE,
            PATIENT_ROLE_CODE,
          ]}
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
        />
        <CoverageTable
          coverageData={data}
          loading={loading}
          handleChangePage={this.handlePageClick}
        ></CoverageTable>
        <AddCoverageDialog {...addCoverageDialogProps}></AddCoverageDialog>
      </div>
    );
  }
}

Coverages.propTypes = {
  getLookups: PropTypes.func.isRequired,
  getSubscriberOptions: PropTypes.func.isRequired,
  getCoverages: PropTypes.func.isRequired,
  onSaveCoverage: PropTypes.func.isRequired,
  coverageType: PropTypes.array.isRequired,
  coverageFmStatus: PropTypes.array.isRequired,
  policyHolderRelationship: PropTypes.array.isRequired,
  subscriptionOptions: PropTypes.array.isRequired,
  patient: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  policyHolderRelationship: makeSelectPolicyHolderRelationship(),
  coverageFmStatus: makeSelectCoverageFmStatus(),
  coverageType: makeSelectCoverageType(),
  patient: makeSelectPatient(),
  subscriptionOptions: makeSelectSubscriptionOptions(),
  data: makeSelectCoverages(),
  loading: makeSelectCoverageLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () =>
      dispatch(
        getLookupsAction([POLICYHOLDER_RELATIONSHIP, FM_STATUS, COVERAGE_TYPE])
      ),
    getSubscriberOptions: (patientId) =>
      dispatch(getSubscriberOptions(patientId)),
    onSaveCoverage: (coverageData, handleSubmitting) =>
      dispatch(getSaveCoverageAction(coverageData, handleSubmitting)),
    getCoverages: (pageNumber) => dispatch(getCoverageAction(pageNumber)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'coverages', reducer });
const withSaga = injectSaga({ key: 'coverages', saga });

export default compose(withReducer, withSaga, withConnect)(Coverages);
