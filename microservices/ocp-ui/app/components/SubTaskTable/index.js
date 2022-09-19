/**
 *
 * SubTaskTable
 *
 */

import FormSubtitle from 'components/FormSubtitle';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Section from 'components/Section';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TASK_TABLE_COLUMNS } from './constants';
import messages from './messages';


function SubTaskTable({ elements, patientId, taskBaseUrl }) {
  return (
    <div>
      <Section>
        <FormSubtitle margin="1vh 0 0 0">
          <FormattedMessage {...messages.header} />
        </FormSubtitle>
        <Table>
          <TableHeader columns={TASK_TABLE_COLUMNS}>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedBy} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
            <TableHeaderColumn />
          </TableHeader>
          {!isEmpty(elements) && elements.map(({ logicalId, definition, status, description, authoredOn, executionPeriod, agent, owner }) => {
            const menuItems = [{
              primaryText: <FormattedMessage {...messages.editTask} />,
              linkTo: {
                pathname: `${taskBaseUrl}/${logicalId}`,
                search: `?patientId=${patientId}&isMainTask=false`,
              },
            }];
            return (
              <TableRow key={logicalId} columns={TASK_TABLE_COLUMNS}>
                <TableRowColumn>{definition && definition.display}</TableRowColumn>
                <TableRowColumn>{status && status.display}</TableRowColumn>
                <TableRowColumn>{description}</TableRowColumn>
                <TableRowColumn>{authoredOn}</TableRowColumn>
                <TableRowColumn>{executionPeriod && executionPeriod.start} - {executionPeriod && executionPeriod.end} </TableRowColumn>
                <TableRowColumn>{agent && agent.display} </TableRowColumn>
                <TableRowColumn>{owner && owner.display} </TableRowColumn>
                <TableRowColumn>
                  <NavigationIconMenu menuItems={menuItems} />
                </TableRowColumn>
              </TableRow>
            );
          })}
        </Table>
      </Section>
    </div>
  );
}

SubTaskTable.propTypes = {
  patientId: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    definition: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    status: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    priority: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    authoredOn: PropTypes.string,
    executionPeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    agent: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    owner: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
  })),

};

export default SubTaskTable;
