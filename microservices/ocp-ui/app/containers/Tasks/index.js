/**
 *
 * Tasks
 *
 */
import Refresh from '@material-ui/icons/Refresh';
import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NoResultsFoundText from 'components/NoResultsFoundText';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import { getLookupsAction } from 'containers/App/actions';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_COMMUNICATION_URL,
  MANAGE_TASK_URL,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  TASK_STATUS,
} from 'containers/App/constants';
import {
  makeSelectPatient,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import { makeSelectTaskStatuses } from 'containers/App/lookupSelectors';
import {
  CANCELLED_STATUS_CODE,
  COMPLETED_STATUS_CODE,
  SUMMARY_VIEW_WIDTH,
} from 'containers/Tasks/constants';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import uniqueId from 'lodash/uniqueId';
import { Checkbox } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import { ASC, DESC } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { mapToPatientName } from 'utils/PatientUtils';
import Util from 'utils/Util';
import CommunicationsTableDialog from '../../components/CommunicationsTableDialog';
import PanelToolbar from '../../components/PanelToolbar';
import AddNewItemSpan from '../../components/PanelToolbar/AddNewItemSpan';
import StyledIconButton from '../../components/StyledIconButton';
import TaskTable from '../../components/TaskTable';
import { getSplitReference } from '../../utils/fhirUtils';
import ShowHideWrapper from '../ShowHideWrapper';
import { actions } from './actions';
import { API } from './api';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectTaskRelatedCommunications,
  makeSelectTasks,
} from './selectors';
// eslint-disable-next-line camelcase
import { env_vars } from '../../../env';

export class Tasks extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
      isPatientModalOpen: false,
      isExpanded: false,
      open: false,
      statusList: [],
      currentTaskId: null,
      activityDefinitionsForFilter: [],
      columnToSort: '',
      sortDirection: DESC,
      showAllTasks: false,
      openAssessment: false,
    };
    this.cancelTask = this.cancelTask.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.handleStatusListChange = this.handleStatusListChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleTaskRowClick = this.handleTaskRowClick.bind(this);
    this.handleTaskRowSpecialClick = this.handleTaskRowSpecialClick.bind(this);
    this.onSize = this.onSize.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
    this.handleFilter = this.handleFilter.bind(this);
    this.setActivityDefinitionsFilter =
      this.setActivityDefinitionsFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleShowAllTasks = this.handleShowAllTasks.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.reloadTask();
  }

  reloadTask() {
    this.props.initializeTasks();
    this.props.getLookups();
    const { patient, user, taskStatus } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    const statusList = taskStatus.filter(
      ({ code }) =>
        code !== CANCELLED_STATUS_CODE || code !== COMPLETED_STATUS_CODE
    );
    this.setState({ statusList });
    if (patient) {
      this.props.getTasks(practitionerId, patient.id, []);
    }
    // console.log('__before setActivityDefinitionsFilter__')
    this.setActivityDefinitionsFilter();
  }

  componentWillReceiveProps(nextProps) {
    const { patient, user } = this.props;
    const { patient: newPatient } = nextProps;
    const practitionerId = getPractitionerIdByRole(user);
    if (!isEqual(patient, newPatient) && nextProps && nextProps.patient) {
      this.props.getTasks(practitionerId, nextProps.patient.id, []);
    }
  }

  async setActivityDefinitionsFilter() {
    // console.log("__setActivityDefinitionsFilter__")
    try {
      const { user } = this.props;
      const practitionerId = getPractitionerIdByRole(user);
      const response = await API.getActivityDefinitionsForPractitioner(
        practitionerId
      );
      const activityDefinitionsForFilter = response.map((a) => {
        const reference = getSplitReference(a.reference);
        return { value: reference, display: a.title };
      });
      this.setState({
        activityDefinitionsForFilter,
      });
      // console.log('response')
      // console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  onSize(size) {
    const isExpanded =
      size && size.width ? Math.floor(size.width) > SUMMARY_VIEW_WIDTH : false;
    this.setState({ isExpanded });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  handleCommunicationPageClick(page) {
    // TODO handle pagination
    console.log(page);
  }

  handleTaskRowSpecialClick(task) {
    console.log('handleTaskRowSpecialClick', task, this.state);

    const assessmentTokenIdentifierSystem =
      env_vars.REACT_APP_ASSESSMENT_TOKEN_IDENTIFIER_SYSTEM;

    const assesmentTokenIdentifier = task.identifier.find(
      (item) => item.system === assessmentTokenIdentifierSystem
    );

    if (assesmentTokenIdentifier === undefined) {
      const { patient, user } = this.props;
      const practitionerId = getPractitionerIdByRole(user);

      if (patient) {
        this.props.getTasks(practitionerId, patient.id, []);
      }
    }
    this.setState({ openAssessment: true });
  }

  handleTaskRowClick(task) {
    const { patient } = this.props;
    this.props.getTaskRelatedCommunications(
      patient.id,
      task.logicalId,
      DEFAULT_START_PAGE_NUMBER
    );
    this.setState({ open: true });
  }

  handleStatusListChange(code, checked) {
    const {
      tasks: { statusList },
      patient,
      user,
    } = this.props;
    const filteredStatusList =
      statusList && statusList.filter((c) => c !== code);
    const newStatusList = checked
      ? [...filteredStatusList, code]
      : filteredStatusList;
    const practitionerId = getPractitionerIdByRole(user);
    this.props.getTasks(practitionerId || '', patient.id, newStatusList);
  }

  handleShowAllTasks(checked) {
    this.setState(
      () => ({
        showAllTasks: !this.state.showAllTasks,
      }),
      () => {
        const { patient } = this.props;
        if (checked && patient) {
          this.props.getTasks(undefined, patient.id, []);
        } else {
          this.reloadTask();
        }
      }
    );
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  cancelTask(logicalId) {
    this.props.cancelTask(logicalId);
  }

  calculateCheckboxColumns({ length }) {
    return `100px repeat(${length < 1 ? 0 : length - 1},110px) 100px 1fr`;
  }

  renderFilter(taskStatus, statusList, showAllTasks) {
    // console.log('renderFilter')
    // console.log(taskStatus)
    // console.log(statusList)
    const filteredTaskStatuses = taskStatus.filter(
      ({ code }) =>
        code === CANCELLED_STATUS_CODE || code === COMPLETED_STATUS_CODE
    );
    // console.log(filteredTaskStatuses)

    return (
      <FilterSection>
        <CheckboxFilterGrid
          columns={this.calculateCheckboxColumns(filteredTaskStatuses)}
        >
          <Cell>
            <CenterAlign>
              <FormattedMessage {...messages.includeLabel} />
            </CenterAlign>
          </Cell>
          {filteredTaskStatuses.map(({ code, display }) => (
            <Cell key={code}>
              <CenterAlign>
                <Checkbox
                  name={code}
                  checked={statusList && statusList.includes(code)}
                  label={display}
                  onCheck={(event, checked) =>
                    this.handleStatusListChange(code, checked)
                  }
                />
              </CenterAlign>
            </Cell>
          ))}
          <Cell>
            <Checkbox
              name={'Show all practitioner tasks'}
              checked={showAllTasks}
              label={'Show all practitioner tasks'}
              onCheck={(event, checked) => this.handleShowAllTasks(checked)}
            />
          </Cell>
        </CheckboxFilterGrid>
      </FilterSection>
    );
  }

  handleFilter(filterBy) {
    console.log('filterBy:');
    console.log(filterBy);
    const { patient, user } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    console.log('handleFilter definition:');
    console.log(filterBy.uuid);
    this.props.getTasks(practitionerId, patient.id, [], filterBy.uuid);
  }

  handleSort(columnName) {
    this.setState({ columnToSort: columnName });
    this.setState({
      sortDirection:
        this.state.columnToSort === columnName
          ? Util.invertSortDirection(this.state.sortDirection)
          : ASC,
    });
  }

  render() {
    const {
      tasks: { loading, data, statusList },
      patient,
      user,
      taskStatus,
      communications,
    } = this.props;
    const taskList = data;

    /* if (!isEmpty(data)) {
      taskList = data.filter((task) => task.description !== TO_DO_DEFINITION);
    } */

    const patientName = mapToPatientName(patient);
    const practitionerId = getPractitionerIdByRole(user);
    let createTaskUrl;
    let addNewItem;
    if (practitionerId && !isEmpty(patient) && !isEmpty(patient.id)) {
      createTaskUrl = `${MANAGE_TASK_URL}?patientId=${patient.id}&isMainTask=true`;
      addNewItem = {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: createTaskUrl,
      };
    }
    const isPatient = user && user.role && user.role === PATIENT_ROLE_CODE;

    const filterDateOptions = [
      // { value: ALL_ORG_PATIENTS, display: ALL_ORG_PATIENTS_DISPLAY },
      // { value: MY_CARE_TEAM_PATIENTS, display: MY_CARE_TEAM_PATIENTS_DISPLAY },
      // { value: UNASSIGNED_PATIENTS, display: UNASSIGNED_PATIENTS_DISPLAY },
      { value: '1', display: 'One' },
      { value: '2', display: 'Two' },
      { value: '3', display: 'Three' },
    ];
    const filterField = {
      // filterTypes: filterDateOptions,
      filterTypes: this.state.activityDefinitionsForFilter,
      filterValueHintText: <FormattedMessage {...messages.filterLabel} />,
    };

    const orderedTasks = orderBy(
      taskList,
      this.state.columnToSort,
      this.state.sortDirection
    );

    return (
      <Card minWidth={'auto'}>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[
            CARE_COORDINATOR_ROLE_CODE,
            CARE_MANAGER_ROLE_CODE,
            ORGANIZATION_ADMIN_ROLE_CODE,
          ]}
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon
          showTaskSpecificFilters
          filterField={filterField}
          onFilter={this.handleFilter}
          onSize={this.handlePanelResize}
          customNewButton={[
            <ShowHideWrapper
              key={uniqueId()}
              allowedRoles={[
                CARE_COORDINATOR_ROLE_CODE,
                CARE_MANAGER_ROLE_CODE,
                ORGANIZATION_ADMIN_ROLE_CODE,
              ]}
            >
              <AddNewItemSpan
                onClick={() => {
                  this.reloadTask();
                }}
              >
                <StyledIconButton
                  size="x-small"
                  svgIconSize="small"
                  disableIconHover
                >
                  <Refresh color={'#3275c1'} />
                </StyledIconButton>
                {'Reload'}
              </AddNewItemSpan>
            </ShowHideWrapper>,
          ]}
        />
        <LinearProgressIndicator loading={loading} />

        {isEmpty(patientName) ? (
          <NoResultsFoundText>
            <FormattedMessage {...messages.patientNotSelected} />
          </NoResultsFoundText>
        ) : (
          <SizedStickyDiv
            onSize={this.handleFilterResize}
            top={`${this.state.panelHeight}px`}
          >
            <Grid columns={1} gap="">
              <Cell>
                <InfoSection>
                  <div>
                    The <FormattedMessage {...messages.tasks} /> for&nbsp;
                    <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
                      <span id={this.PATIENT_NAME_HTML_ID}>{patientName}</span>
                      &nbsp;
                    </InlineLabel>
                    are :
                  </div>
                </InfoSection>
              </Cell>
            </Grid>
          </SizedStickyDiv>
        )}
        <Cell>
          {this.renderFilter(taskStatus, statusList, this.state.showAllTasks)}
        </Cell>

        {!loading &&
          !isEmpty(patientName) &&
          !isEmpty(patient.id) &&
          isEmpty(taskList) && (
            <NoResultsFoundText>
              <FormattedMessage {...messages.noTasksFound} />
            </NoResultsFoundText>
          )}

        {!isEmpty(taskList) && (
          <div>
            <CenterAlign>
              <TaskTable
                relativeTop={this.state.panelHeight + this.state.filterHeight}
                elements={orderedTasks}
                cancelTask={this.cancelTask}
                patientId={patient.id}
                communicationBaseUrl={MANAGE_COMMUNICATION_URL}
                taskBaseUrl={MANAGE_TASK_URL}
                onSize={this.onSize}
                isExpanded={this.state.isExpanded}
                isPatient={isPatient}
                onTaskClick={this.handleTaskRowClick}
                onSpecialClick={this.handleTaskRowSpecialClick}
                handleSort={this.handleSort}
                columnToSort={this.state.columnToSort}
                sortDirection={this.state.sortDirection}
              />
            </CenterAlign>
          </div>
        )}
        <CommunicationsTableDialog
          isLoading={false}
          open={this.state.open}
          handleDialogClose={this.handleDialogClose}
          data={communications}
          selectedPatient={patient}
          handleChangePage={this.handleCommunicationPageClick}
          manageCommunicationBaseUrl={MANAGE_COMMUNICATION_URL}
        ></CommunicationsTableDialog>
      </Card>
    );
  }
}

Tasks.propTypes = {
  initializeTasks: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    statusList: PropTypes.arrayOf(PropTypes.string),
  }),
  patient: PropTypes.object,
  user: PropTypes.object,
  taskStatus: PropTypes.array,
  communications: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getTaskRelatedCommunications: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
  taskStatus: makeSelectTaskStatuses(),
  communications: makeSelectTaskRelatedCommunications(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS])),
    getTasks: (practitionerId, patientId, statusList, definition) =>
      dispatch(
        actions.getTasks(practitionerId, patientId, statusList, definition)
      ),
    initializeTasks: () => dispatch(actions.initializeTasks()),
    cancelTask: (id) => dispatch(actions.cancelTask(id)),
    getTaskRelatedCommunications: (patient, taskId, pageNumber) =>
      dispatch(
        actions.getTaskRelatedCommunications(patient, taskId, pageNumber)
      ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tasks', reducer });
const withSaga = injectSaga({ key: 'tasks', saga });

export default compose(withReducer, withSaga, withConnect)(Tasks);
