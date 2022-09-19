/**
 *
 * UpcomingTasks
 *
 */

import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import NoResultsFoundText from 'components/NoResultsFoundText';
import PanelToolbar from 'components/PanelToolbar';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import UpcomingTasksTable from 'components/UpcomingTasksTable';
import { TO_DO_DEFINITION } from 'containers/App/constants';
import {
  makeSelectPatient,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import {
  getUpcomingTasks,
  initializeUpcomingTasks,
} from 'containers/UpcomingTasks/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectUpcomingTasks,
  makeSelectUpcomingTasksLoading,
} from './selectors';

export class UpcomingTasks extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPatientModalOpen: false,
      panelHeight: 0,
    };
    this.handlePatientViewDetailsClick =
      this.handlePatientViewDetailsClick.bind(this);
    this.handlePatientModalClose = this.handlePatientModalClose.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
  }

  componentDidMount() {
    this.props.initializeUpcomingTasks();
    const { user } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    if (practitionerId) {
      this.props.getUpcomingTasks(practitionerId);
    }
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handlePatientViewDetailsClick() {
    this.setState({ isPatientModalOpen: true });
  }

  handlePatientModalOpen() {
    this.setState({ isPatientModalOpen: true });
  }

  handlePatientModalClose() {
    this.setState({ isPatientModalOpen: false });
  }

  render() {
    const { loading, data, practitionerId, user } = this.props;
    let taskList = data;
    if (!isEmpty(data)) {
      taskList = data.filter(
        (task) =>
          task.description !== TO_DO_DEFINITION &&
          task.owner.reference.substring(
            task.owner.reference.indexOf('/') + 1
          ) === user.fhirResource.logicalId
      );
    }
    return (
      <Card>
        <PanelToolbar
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          onSize={this.handlePanelResize}
        />
        {loading && <RefreshIndicatorLoading />}

        {!loading && isEmpty(taskList) && (
          <NoResultsFoundText>
            <FormattedMessage {...messages.noUpcomingTasksFound} />
          </NoResultsFoundText>
        )}
        {!isEmpty(taskList) && !isEmpty(taskList) && (
          <div>
            <CenterAlign>
              <UpcomingTasksTable
                elements={taskList}
                loginPractitonerId={practitionerId}
                onPatientViewDetailsClick={this.handlePatientViewDetailsClick}
                relativeTop={this.state.panelHeight}
              />
            </CenterAlign>
          </div>
        )}
        {this.props.patient && (
          <ConfirmPatientModal
            patient={this.props.patient}
            isPatientModalOpen={this.state.isPatientModalOpen}
            onPatientModalClose={this.handlePatientModalClose}
          />
        )}
      </Card>
    );
  }
}

UpcomingTasks.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  practitionerId: PropTypes.string,
  initializeUpcomingTasks: PropTypes.func.isRequired,
  getUpcomingTasks: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectUpcomingTasksLoading(),
  data: makeSelectUpcomingTasks(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeUpcomingTasks: () => dispatch(initializeUpcomingTasks()),
    getUpcomingTasks: (practitionerId) =>
      dispatch(getUpcomingTasks(practitionerId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingTasks', reducer });
const withSaga = injectSaga({ key: 'upcomingTasks', saga });

export default compose(withReducer, withSaga, withConnect)(UpcomingTasks);
