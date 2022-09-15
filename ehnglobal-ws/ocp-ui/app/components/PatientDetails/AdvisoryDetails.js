import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';

import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, PCP_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE } from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AdvisoryDetailsCell from './AdvisoryDetailsCell';
import messages from './messages';
import StyledAdvisoryTable from './StyledAdvisoryTable';


const tableColumns = '3fr 1.5fr 1.5fr 2fr 2fr';

function AdvisoryDetails({ flags }) {
  return (
    <AdvisoryDetailsCell>
      <ShowHideWrapper allowedRoles={[ORGANIZATION_ADMIN_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, PCP_ROLE_CODE]}>
        <StyledAdvisoryTable>
          <TableHeader columns={tableColumns}>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAuthor} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPeriodStart} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPeriodEnd} /></TableHeaderColumn>
          </TableHeader>
          {!isEmpty(flags) && flags.map((flag) => {
            const { author, categoryDisplay, statusDisplay, period } = flag;
            return (
              <TableRow key={uniqueId()} columns={tableColumns}>
                <TableRowColumn>{author.display}</TableRowColumn>
                <TableRowColumn>{categoryDisplay}</TableRowColumn>
                <TableRowColumn>{statusDisplay}</TableRowColumn>
                <TableRowColumn>{period.start}</TableRowColumn>
                <TableRowColumn>{period.end}</TableRowColumn>
              </TableRow>
            );
          })}
        </StyledAdvisoryTable>
      </ShowHideWrapper>
    </AdvisoryDetailsCell>
  );
}

AdvisoryDetails.propTypes = {
  flags: PropTypes.arrayOf(PropTypes.shape({
    categoryDisplay: PropTypes.string,
    logicalId: PropTypes.string.isRequired,
    author: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    subject: PropTypes.string,
    code: PropTypes.string,
    statusDisplay: PropTypes.string,
    status: PropTypes.string,
    category: PropTypes.string,
    period: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  })),
};

export default AdvisoryDetails;
