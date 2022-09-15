/**
 *
 * ActivityDefinitions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import ActivityDefinitionsTable from 'components/ActivityDefinitionsTable';
import { getActivityDefinitionsInOrganization } from './actions';
import makeSelectActivityDefinitions from './selectors';
import reducer from './reducer';
import saga from './saga';
import { flattenActivityDefinitionsData } from './helpers';

export class ActivityDefinitions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChangeListPage = this.handleChangeListPage.bind(this);
  }

  componentDidMount() {
    const { organization } = this.props;
    if (organization) {
      this.props.getActivityDefinitionsInOrganization(DEFAULT_START_PAGE_NUMBER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.getActivityDefinitionsInOrganization(DEFAULT_START_PAGE_NUMBER);
    }
  }

  handleChangeListPage(currentPage) {
    this.props.getActivityDefinitionsInOrganization(currentPage);
  }

  render() {
    const { activityDefinitions } = this.props;
    const activityDefinitionsData = {
      data: flattenActivityDefinitionsData(activityDefinitions.listActivityDefinitions.data),
      currentPage: activityDefinitions.listActivityDefinitions.currentPage,
      totalNumberOfPages: activityDefinitions.listActivityDefinitions.totalNumberOfPages,
      currentPageSize: activityDefinitions.listActivityDefinitions.currentPageSize,
      totalElements: activityDefinitions.listActivityDefinitions.totalElements,
      handleChangePage: this.handleChangeListPage,
    };
    return (
      <div>
        <ActivityDefinitionsTable activityDefinitionsData={activityDefinitionsData} />
      </div>
    );
  }
}

ActivityDefinitions.propTypes = {
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
  activityDefinitions: PropTypes.shape({
    listActivityDefinitions: PropTypes.shape({
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      data: PropTypes.arrayOf(PropTypes.shape({
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
      })),
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
      ]),
    }),
  }),
  getActivityDefinitionsInOrganization: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  activityDefinitions: makeSelectActivityDefinitions(),
});

function mapDispatchToProps(dispatch) {
  return {
    getActivityDefinitionsInOrganization: (currentPage) => dispatch(getActivityDefinitionsInOrganization(currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'activityDefinitions', reducer });
const withSaga = injectSaga({ key: 'activityDefinitions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ActivityDefinitions);
