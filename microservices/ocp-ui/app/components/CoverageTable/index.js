/**
 *
 * CoverageTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import sizeMeHOC from 'utils/SizeMeUtils';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import Table from 'components/Table';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import ExpansionTableRow from 'components/ExpansionTableRow';
import CoverageRowDetails from './CoverageExpansionRowDetails';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH } from './constants';

function CoverageTable(props) {
  const { loading, coverageData, handleChangePage } = props;
  const { size } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;

  return (
    <div>
      <LinearProgressIndicator loading={loading} />
      {!loading && isEmpty(coverageData) &&
      <NoResultsFoundText><FormattedMessage {...messages.noCoverageReason} /></NoResultsFoundText>
      }
      {(!loading && coverageData.elements && coverageData.elements.length > 0 &&
        <div>
          <Table>
            <TableHeader columns={columns} relativeTop={props.relativeTop}>
              <TableHeaderColumn />
              <TableHeaderColumn><FormattedMessage {...messages.coverage} /></TableHeaderColumn>
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.ID} /></TableHeaderColumn>
              }
              <TableHeaderColumn><FormattedMessage {...messages.status} /></TableHeaderColumn>
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.beneficiary} /></TableHeaderColumn>
              }
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.period} /></TableHeaderColumn>
              }
              <TableHeaderColumn><FormattedMessage {...messages.subscriber} /></TableHeaderColumn>
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.copay} /></TableHeaderColumn>
              }
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.network} /></TableHeaderColumn>
              }
            </TableHeader>
            {!isEmpty(coverageData.elements) && coverageData.elements.map((coverage) => {
              const { statusDisplay, beneficiary, subscriber, endDate, startDate, subscriberId, typeDisplay, groupingPlanDisplay, network } = coverage;

              return (
                <ExpansionTableRow
                  expansionTableRowDetails={<CoverageRowDetails coverage={coverage} />}
                  columns={columns}
                  key={coverage.logicalId}
                  role="button"
                  tabIndex="0"
                >
                  <TableRowColumn>{typeDisplay}</TableRowColumn>
                  {isExpanded &&
                  <TableRowColumn>{subscriberId}</TableRowColumn>
                  }
                  <TableRowColumn>{statusDisplay}</TableRowColumn>
                  {isExpanded &&
                  <TableRowColumn>{beneficiary && beneficiary.display}</TableRowColumn>
                  }
                  {isExpanded &&
                  <TableRowColumn> {startDate} - {endDate} </TableRowColumn>
                  }
                  <TableRowColumn>{subscriber && subscriber.display}</TableRowColumn>
                  {isExpanded &&
                  <TableRowColumn> {groupingPlanDisplay} </TableRowColumn>
                  }
                  {isExpanded &&
                  <TableRowColumn> {network} </TableRowColumn>
                  }
                </ExpansionTableRow>
              );
            })}
          </Table>
          <CenterAlignedUltimatePagination
            currentPage={coverageData.currentPage}
            totalPages={coverageData.totalNumberOfPages}
            onChange={handleChangePage}
            boundaryPagesRange={1}
            siblingPagesRange={1}
            hidePreviousAndNextPageLinks={false}
            hideFirstAndLastPageLinks={false}
            hideEllipsis={false}
          />
        </div>
      )}
    </div>
  );
}

CoverageTable.propTypes = {
  relativeTop: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  coverageData: PropTypes.shape({
    currentPage: PropTypes.number,
    totalNumberOfPages: PropTypes.number,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    elements: PropTypes.array,
  }).isRequired,
  handleChangePage: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(CoverageTable);
