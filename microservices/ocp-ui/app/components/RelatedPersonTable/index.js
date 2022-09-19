/**
 *
 * RelatedPersonTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import { MANAGE_RELATED_PERSON_URL } from 'containers/App/constants';
import messages from './messages';
import { RELATED_PERSON_TABLE_COLUMNS } from './constants';

function RelatedPersonTable({ relativeTop, relatedPersons, patientId }) {
  return (
    <Table>
      <TableHeader columns={RELATED_PERSON_TABLE_COLUMNS} relativeTop={relativeTop}>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderRelationship} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
      {relatedPersons && relatedPersons.map((relatedPerson) => {
        const menuItems = [{
          primaryText: <FormattedMessage {...messages.edit} />,
          linkTo: {
            pathname: `${MANAGE_RELATED_PERSON_URL}/${relatedPerson.relatedPersonId}`,
            search: `?patientId=${patientId}`,
          },
        }];
        return (
          <TableRow key={uniqueId()} columns={RELATED_PERSON_TABLE_COLUMNS}>
            <TableRowColumn>{relatedPerson.firstName} {relatedPerson.lastName}</TableRowColumn>
            <TableRowColumn>{relatedPerson.relationshipValue}</TableRowColumn>
            <TableRowColumn>{relatedPerson.active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />}
            </TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

RelatedPersonTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  relatedPersons: PropTypes.array.isRequired,
  patientId: PropTypes.string.isRequired,
};

export default RelatedPersonTable;
