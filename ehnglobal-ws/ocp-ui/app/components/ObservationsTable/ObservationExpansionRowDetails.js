import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import startCase from 'lodash/startCase';
import get from 'lodash/get';
import messages from './messages';

import { getObservationValueDisplay } from './utils';

function ObservationExpansionRowDetails({ observation }) {
  const column = '3fr 3fr 3fr 3fr';

  // const rowsRender = (_observation) =>
  //   Object.keys(_observation).map((key) => {
  //     const { issued, status } = _observation[key];
  //     return (
  //       <TableRow key={uniqueId()} columns={column}>
  //         <TableRowColumn>
  //           {issued && moment(issued).format('YYYY-MM-DD')}
  //         </TableRowColumn>
  //         <TableRowColumn>{status && status.display}</TableRowColumn>
  //       </TableRow>
  //     );
  //   });
  console.log('observation' + observation);
  const rowsRender = () => (
    <TableRow>
      <TableRowColumn>
        {observation.issued && moment(observation.issued).format('YYYY-MM-DD')}
      </TableRowColumn>
      <TableRowColumn>{startCase(observation.status)}</TableRowColumn>
      <TableRowColumn>
        {startCase(get(observation, 'code.coding[0].display'))}
      </TableRowColumn>
      <TableRowColumn>{getObservationValueDisplay(observation)}</TableRowColumn>
    </TableRow>
  );

  const noRecordsRender = () => (
    <TableRow>
      <TableRowColumn>
        <span>
          <FormattedMessage {...messages.expansionRowDetails.noRecords} />
        </span>
      </TableRowColumn>
    </TableRow>
  );

  return (
    <div>
      <Table>
        <TableHeader columns={column}>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderIssued} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderStatus} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderCode} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderValue} />
          </TableHeaderColumn>
        </TableHeader>

        {observation && Object.keys(observation).length > 0
          ? rowsRender(observation)
          : noRecordsRender()}
      </Table>
    </div>
  );
}

ObservationExpansionRowDetails.propTypes = {
  observation: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default ObservationExpansionRowDetails;
