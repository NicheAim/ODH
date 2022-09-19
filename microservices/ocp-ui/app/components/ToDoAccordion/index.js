/**
 *
 * ToDoAccordion
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
import { DUE_TODAY, OVER_DUE, UPCOMING } from 'components/ToDoAccordion/constants';
import ToDoCardCell from 'components/ToDoCardCell';

import Divider from 'material-ui-next/Divider';

import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui-next/ExpansionPanel';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import messages from './messages';

class ToDoAccordion extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
      statusElement = (<div><ContentFlag color="#009688" /><FormattedMessage {...messages.todoStatusUpcoming} /></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (
        <div><NotificationPriorityHigh color="#d86344" /><FormattedMessage {...messages.todoStatusOverdue} /></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><ActionEvent color="#f4b942" /><FormattedMessage {...messages.todoStatusDueToday} /></div>);
    }
    return statusElement;
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }

  render() {
    const {
      toDo,
      taskBaseUrl,
      isPractitioner,
      isPatient,
      openDialog,
      patientId,
      columns,
      communicationBaseUrl,
      handleToDoClick,
    } = this.props;
    const dueDateStr = toDo && toDo.executionPeriod && toDo.executionPeriod.end ? 'Due '.concat(toDo.executionPeriod.end) : '';
    const patientNameStr = ((isPatient && isPractitioner) || isPractitioner) ? (toDo && toDo.beneficiary && toDo.beneficiary.display) : '';
    const editTodoUrl = `${taskBaseUrl}/${toDo.logicalId}?patientId=${patientId}&isMainTask=false`;
    const addCommuncationUrl = `${communicationBaseUrl}?patientId=${patientId}&toDoLogicalId=${toDo.logicalId}`;
    const menuItems = [
      {
        primaryText: <FormattedMessage {...messages.editToDo} />,
        linkTo: `${editTodoUrl}`,
      }, {
        primaryText: <FormattedMessage {...messages.addCommunication} />,
        linkTo: `${addCommuncationUrl}`,
      }, {
        primaryText: <FormattedMessage {...messages.cancelToDo} />,
        onClick: () => openDialog(toDo.logicalId),
      }];
    return (
      <Padding bottom={5}>
        <ExpansionPanel expanded={this.state.expansionPanelOpen}>
          <ExpansionPanelSummary>
            <ToDoCardCell top={1} left={1} width={14}>
              <Grid columns={columns} gap="">
                <Cell>
                  {this.state.expansionPanelOpen ?
                    <ExpandLessIcon onClick={this.handlePanelOpen} /> :
                    <ExpandMoreIcon onClick={this.handlePanelOpen} />
                  }
                </Cell>
                <Cell
                  onClick={() => {
                    if (handleToDoClick) {
                      handleToDoClick(toDo.logicalId);
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
                    if (handleToDoClick) {
                      handleToDoClick(toDo.logicalId);
                    }
                  }}
                >
                  <Align variant="right">
                    <strong>
                      {this.getStatusWithIcon(toDo.taskDue)}
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
            </ToDoCardCell>
          </ExpansionPanelSummary>
          <Divider light />
          <ExpansionPanelDetails>
            <InfoSection width={'100%'}>
              <Grid columns={'20% 20% 20% 20% 20%'} justifyContent="space-between">
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.startDate} />}
                    text={toDo.executionPeriod && toDo.executionPeriod.start}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.endDate} />}
                    text={toDo.executionPeriod && toDo.executionPeriod.end}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.status} />}
                    text={toDo.status && toDo.status.display}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.priority} />}
                    text={toDo.priority && toDo.priority.display}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.purpose} />}
                    text={toDo.intent && toDo.intent.display}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.taskOwner} />}
                    text={toDo.owner && toDo.owner.display}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.participation} />}
                    text={toDo.performerType && toDo.performerType.display}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.episodeOfCare} />}
                    text={toDo.context && toDo.context.display}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.comments} />}
                    text={toDo.note}
                  />
                </Cell>
                <Cell>
                  <TextLabelGroup
                    label={<FormattedMessage {...messages.description} />}
                    text={toDo.description}
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

ToDoAccordion.propTypes = {
  isPatient: PropTypes.bool,
  columns: PropTypes.string,
  toDo: PropTypes.object,
  isPractitioner: PropTypes.bool.isRequired,
  taskBaseUrl: PropTypes.string,
  communicationBaseUrl: PropTypes.string,
  patientId: PropTypes.string,
  openDialog: PropTypes.func,
  handleToDoClick: PropTypes.func,
};

export default ToDoAccordion;
