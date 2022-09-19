/**
 *
 * TaskAccordion
 *
 */

 import ActionEvent from '@material-ui/icons/Event';
 import ExpandLessIcon from '@material-ui/icons/ExpandLess';
 import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
 import ContentFlag from '@material-ui/icons/Flag';
 import NotificationPriorityHigh from '@material-ui/icons/PriorityHigh';
 import Align from 'components/Align';
 import InfoSection from 'components/InfoSection';
 import NavigationIconMenu from 'components/NavigationIconMenu';
 import Padding from 'components/Padding';
 import TextLabelGroup from 'components/TextLabelGroup';
 import { DUE_TODAY, OVER_DUE, UPCOMING } from 'components/TaskAccordion/constants';
 import TaskCardCell from 'components/TaskCardCell';
 
 import Divider from 'material-ui-next/Divider';
 
 import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui-next/ExpansionPanel';
 import PropTypes from 'prop-types';
 import React from 'react';
 import { FormattedMessage } from 'react-intl';
 import { Cell, Grid } from 'styled-css-grid';
 import messages from './messages';
 
 class TaskAccordion extends React.Component { // eslint-disable-line react/prefer-stateless-function
   constructor(props) {
     super(props);
     this.state = {
       expansionPanelOpen: false,
     };
     this.handlePanelOpen = this.handlePanelOpen.bind(this);
   }
 
   getStatusWithIcon(statusStr) {
     let statusElement = null;
     if (statusStr === UPCOMING) {
       statusElement = (<div><ContentFlag color="#009688" /><FormattedMessage {...messages.taskStatusUpcoming} /></div>);
     } else if (statusStr === OVER_DUE) {
       statusElement = (
         <div><NotificationPriorityHigh color="#d86344" /><FormattedMessage {...messages.taskStatusOverdue} /></div>);
     } else if (statusStr === DUE_TODAY) {
       statusElement = (<div><ActionEvent color="#f4b942" /><FormattedMessage {...messages.taskStatusDueToday} /></div>);
     }
     return statusElement;
   }
 
   handlePanelOpen() {
     this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
   }
 
   render() {
     const {
       task,
       taskBaseUrl,
       isPractitioner,
       isPatient,
       openDialog,
       patientId,
       columns,
       communicationBaseUrl,
       handleTaskClick,
     } = this.props;
     const dueDateStr = task && task.executionPeriod && task.executionPeriod.end ? 'Due '.concat(task.executionPeriod.end) : '';
     const patientNameStr = ((isPatient && isPractitioner) || isPractitioner) ? (task && task.beneficiary && task.beneficiary.display) : '';
     const edittaskUrl = `${taskBaseUrl}/${task.logicalId}?patientId=${patientId}&isMainTask=false`;
     const addCommuncationUrl = `${communicationBaseUrl}?patientId=${patientId}&taskLogicalId=${task.logicalId}`;
     const menuItems = [
       {
         primaryText: <FormattedMessage {...messages.edittask} />,
         linkTo: `${edittaskUrl}`,
       }, {
         primaryText: <FormattedMessage {...messages.addCommunication} />,
         linkTo: `${addCommuncationUrl}`,
       }, {
         primaryText: <FormattedMessage {...messages.canceltask} />,
         onClick: () => openDialog(task.logicalId),
       }];
     return (
       <Padding bottom={5}>
         <ExpansionPanel expanded={this.state.expansionPanelOpen}>
           <ExpansionPanelSummary>
             <TaskCardCell top={1} left={1} width={14}>
               <Grid columns={columns} gap="">
                 <Cell>
                   {this.state.expansionPanelOpen ?
                     <ExpandLessIcon onClick={this.handlePanelOpen} /> :
                     <ExpandMoreIcon onClick={this.handlePanelOpen} />
                   }
                 </Cell>
                 <Cell
                   onClick={() => {
                     if (handleTaskClick) {
                       handleTaskClick(task.logicalId);
                     }
                   }}
                 >
                   <strong>
                     {dueDateStr}
                   </strong>
                 </Cell>
                 {!isPatient &&
                 <Align variant="right">
                   <strong>{patientNameStr}</strong>
                 </Align>
                 }
                 <Cell
                   onClick={() => {
                     if (handleTaskClick) {
                       handleTaskClick(task.logicalId);
                     }
                   }}
                 >
                   <Align variant="right">
                     <strong>
                       {this.getStatusWithIcon(task.taskDue)}
                     </strong>
                   </Align>
                 </Cell>
                 {isPatient &&
                 <Cell>
                   <Align variant="right">
                     <NavigationIconMenu menuItems={menuItems} />
                   </Align>
                 </Cell>
                 }
               </Grid>
             </TaskCardCell>
           </ExpansionPanelSummary>
           <Divider light />
           <ExpansionPanelDetails>
             <InfoSection width={'100%'}>
               <Grid columns={'20% 20% 20% 20% 20%'} justifyContent="space-between">
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.startDate} />}
                     text={task.executionPeriod && task.executionPeriod.start}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.endDate} />}
                     text={task.executionPeriod && task.executionPeriod.end}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.status} />}
                     text={task.status && task.status.display}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.priority} />}
                     text={task.priority && task.priority.display}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.purpose} />}
                     text={task.intent && task.intent.display}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.taskOwner} />}
                     text={task.owner && task.owner.display}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.participation} />}
                     text={task.performerType && task.performerType.display}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.episodeOfCare} />}
                     text={task.context && task.context.display}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.comments} />}
                     text={task.note}
                   />
                 </Cell>
                 <Cell>
                   <TextLabelGroup
                     label={<FormattedMessage {...messages.description} />}
                     text={task.description}
                   />
                 </Cell>
               </Grid>
             </InfoSection>
           </ExpansionPanelDetails>
         </ExpansionPanel>
       </Padding>
     );
   }
 }
 
 TaskAccordion.propTypes = {
   isPatient: PropTypes.bool,
   columns: PropTypes.string,
   task: PropTypes.object,
   isPractitioner: PropTypes.bool.isRequired,
   taskBaseUrl: PropTypes.string,
   communicationBaseUrl: PropTypes.string,
   patientId: PropTypes.string,
   openDialog: PropTypes.func,
   handleTaskClick: PropTypes.func,
 };
 
 export default TaskAccordion;
 