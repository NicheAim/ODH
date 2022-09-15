/**
 *
 * PractitionerTasks
 *
 */

 import NoResultsFoundText from 'components/NoResultsFoundText';
 import { PanelToolbar } from 'components/PanelToolbar';
 import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
 import TaskList from 'components/TaskList';
 import { getLookupsAction } from 'containers/App/actions';
 import {
   CARE_COORDINATOR_ROLE_CODE,
   CARE_MANAGER_ROLE_CODE,
   DATE_RANGE,
   PCP_ROLE_CODE,
   TO_DO_DEFINITION,
 } from 'containers/App/constants';
 import { makeSelectUser } from 'containers/App/contextSelectors';
 import { makeSelectTaskFilterDateRanges } from 'containers/App/lookupSelectors';
 import { getFilterTasks, getPractitionerTasks } from 'containers/PractitionerTasks/actions';
 import { makeSelectPractitionerTasks, makeSelectSearchLoading } from 'containers/PractitionerTasks/selectors';
 import isEmpty from 'lodash/isEmpty';
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
 
 export class PractitionerTasks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
   constructor(props) {
     super(props);
     this.handleFilter = this.handleFilter.bind(this);
   }
 
   componentDidMount() {
     this.props.getLookups();
     const definition = TO_DO_DEFINITION;
     const practitionerId = this.getPractitionerId();
     if (practitionerId) {
       this.props.getPractitionerTasks(practitionerId, definition);
     }
   }
 
   getPractitionerId() {
     const { user } = this.props;
     const practitionerId = user && (user.role === CARE_COORDINATOR_ROLE_CODE || user.role === CARE_MANAGER_ROLE_CODE || user.role === PCP_ROLE_CODE) ? user.fhirResource.logicalId : null;
     return practitionerId;
   }
 
   handleFilter(dateRange) {
     const definition = TO_DO_DEFINITION;
     const practitionerId = this.getPractitionerId();
 
     if (practitionerId && dateRange) {
       this.props.getFilterTasks(practitionerId, definition, dateRange);
     }
   }
 
   render() {
     const { tasks, loading, dateRanges } = this.props;
     const filterField = {
       filterTypes: dateRanges,
       filterValueHintText: <FormattedMessage {...messages.selectLabelDateRange} />,
     };
     return (
       <div>
         {loading && <RefreshIndicatorLoading />}
         <PanelToolbar
           showSearchIcon={false}
           showUploadIcon={false}
           showSettingIcon={false}
           showToDoSpecificFilters
           filterField={filterField}
           onFilter={this.handleFilter}
         />
         {!loading && isEmpty(tasks) &&
         <NoResultsFoundText>
           <FormattedMessage {...messages.noTasksFound} />
         </NoResultsFoundText>}
         {!isEmpty(tasks) &&
         <div>
           <TaskList
             isPractitioner
             tasks={tasks}
           />
         </div>
         }
       </div>
     );
   }
 }
 
 PractitionerTasks.propTypes = {
   tasks: PropTypes.array.isRequired,
   getPractitionerTasks: PropTypes.func.isRequired,
   getFilterTasks: PropTypes.func.isRequired,
   getLookups: PropTypes.func.isRequired,
   user: PropTypes.object,
   loading: PropTypes.bool.isRequired,
   dateRanges: PropTypes.array.isRequired,
 };
 
 const mapStateToProps = createStructuredSelector({
   tasks: makeSelectPractitionerTasks(),
   loading: makeSelectSearchLoading(),
   user: makeSelectUser(),
   dateRanges: makeSelectTaskFilterDateRanges(),
 });
 
 function mapDispatchToProps(dispatch) {
   return {
     getLookups: () => dispatch(getLookupsAction([DATE_RANGE])),
     getPractitionerTasks: (practitionerId, definition) => dispatch(getPractitionerTasks(practitionerId, definition)),
     getFilterTasks: (practitionerId, definition, dateRange) => dispatch(getFilterTasks(practitionerId, definition, dateRange)),
   };
 }
 
 const withConnect = connect(mapStateToProps, mapDispatchToProps);
 
 const withReducer = injectReducer({ key: 'practitionerTasks', reducer });
 const withSaga = injectSaga({ key: 'practitionerTasks', saga });
 
 export default compose(
   withReducer,
   withSaga,
   withConnect,
 )(PractitionerTasks);
 