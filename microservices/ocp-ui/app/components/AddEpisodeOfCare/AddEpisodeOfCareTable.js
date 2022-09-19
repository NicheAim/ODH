import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import find from 'lodash/find';
import messages from './messages';
import { ENTERED_IN_ERROR_STATUS } from './constants';

function AddEpisodeOfCareTable(props) {
  const tableColumns = 'repeat(5, 1fr) 80px';
  const {
    errors,
    arrayHelpers,
    onEditEpisodeOfCare,
    episodeOfCares,
    episodeOfCareType,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderCareManager} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.episodeOfCares &&
        <CustomErrorText>{errors.episodeOfCares}</CustomErrorText>
        }
        {episodeOfCares && episodeOfCares.map((episodeOfCare, index) => {
          const { type, status, startDate, endDate, careManager } = episodeOfCare;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionEdit} />,
            onClick: () => onEditEpisodeOfCare(index, episodeOfCare),
          }, {
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionRemove} />,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (status !== ENTERED_IN_ERROR_STATUS &&
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{status}</TableRowColumn>
              <TableRowColumn>{find(episodeOfCareType, { code: type }) && (find(episodeOfCareType, { code: type })).display}</TableRowColumn>
              <TableRowColumn>{careManager && careManager.display}</TableRowColumn>
              <TableRowColumn>{startDate.toLocaleDateString()}</TableRowColumn>
              <TableRowColumn>{endDate.toLocaleDateString()}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

AddEpisodeOfCareTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  onEditEpisodeOfCare: PropTypes.func.isRequired,
  episodeOfCares: PropTypes.array,
  episodeOfCareType: PropTypes.array,
};
export default AddEpisodeOfCareTable;
