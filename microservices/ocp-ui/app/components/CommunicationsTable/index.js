/**
 *
 * CommunicationsTable
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
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import NavigationIconMenu from 'components/NavigationIconMenu';
import {
  EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
} from 'components/CommunicationsTable/constants';
import ExpansionTableRow from 'components/ExpansionTableRow';
import CommunicationExpansionRowDetails from 'components/CommunicationsTable/CommunicationExpansionRowDetails';
import messages from './messages';
import { dateTimeZoneET } from '../../utils/dateFormats';


function CommunicationsTable(props) {
  const { loading, data, selectedPatient, manageCommunicationBaseUrl } = props.communicationsData;
  const { size } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;

  return (
    <div>
      {loading && <RefreshIndicatorLoading />}
      {(!loading && data && data.elements &&
        data.elements.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={columns} relativeTop={props.relativeTop}>
                <TableHeaderColumn />
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCommunicationStatus} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreator} /></TableHeaderColumn>
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreationDate} /></TableHeaderColumn>
                }
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactMethod} /></TableHeaderColumn>
                }
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactNote} /></TableHeaderColumn>
                }
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderContactDuration} /></TableHeaderColumn>
                }
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategory} /></TableHeaderColumn>
                }
                {isExpanded &&
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderLastUpdated} /></TableHeaderColumn>
                }
                <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(data.elements) && data.elements.map((communication) => {
                const menuItems = [{
                  primaryText: 'Edit',
                  linkTo: {
                    pathname: `${manageCommunicationBaseUrl}/${communication.logicalId}`,
                    search: `?patientId=${selectedPatient.id}`,
                  },
                }];
                const {
                  statusCode,
                  statusValue,
                  categoryValue,
                  mediumValue,
                  lastUpdated,
                  sent,
                  sender,
                  note,
                  duration,
                } = communication;

                return (
                  <ExpansionTableRow
                    expansionTableRowDetails={<CommunicationExpansionRowDetails communication={communication} />}
                    columns={columns}
                    key={communication.logicalId}
                    role="button"
                    tabIndex="0"
                  >
                    <TableRowColumn>
                      {statusCode === 'not-done' ||
                      statusCode === 'in-progress' ||
                      statusCode === 'on-hold' ||
                      statusCode === 'stopped' ||
                      statusCode === 'unknown' ||
                      statusCode === 'entered-in-error' ? (
                        <FormattedMessage {...messages.notOccurred} />
                      ) : (
                        <FormattedMessage {...messages.occurred} />
                      )}
                    </TableRowColumn>
                    <TableRowColumn>{ sender && sender.display }</TableRowColumn>
                    {isExpanded &&
                    <TableRowColumn>{ dateTimeZoneET(sent) }</TableRowColumn>
                    }
                    <TableRowColumn>{statusValue}</TableRowColumn>
                    {isExpanded &&
                    <TableRowColumn>{mediumValue}</TableRowColumn>
                    }
                    {isExpanded &&
                    <TableRowColumn>{note}</TableRowColumn>
                    }
                    {isExpanded &&
                    <TableRowColumn>{duration}</TableRowColumn>
                    }
                    {isExpanded &&
                    <TableRowColumn>{categoryValue}</TableRowColumn>
                    }
                    {isExpanded &&
                    <TableRowColumn>{ dateTimeZoneET(lastUpdated) }</TableRowColumn>
                    }
                    <TableRowColumn>
                      <NavigationIconMenu menuItems={menuItems} />
                    </TableRowColumn>
                  </ExpansionTableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={props.handleChangePage}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
            />
          </div> :
          (
            <NoResultsFoundText><FormattedMessage {...messages.noCommunications} /></NoResultsFoundText>
          )
      )}
    </div>
  );
}


CommunicationsTable.defaultProps = {
  relativeTop: 0,
};


CommunicationsTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  communicationsData: PropTypes.shape({
    manageCommunicationBaseUrl: PropTypes.string.isRequired,
    selectedPatient: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.array,
    }),
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      currentPage: PropTypes.number,
      totalNumberOfPages: PropTypes.number,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      elements: PropTypes.array,
    }),
  }).isRequired,
  handleChangePage: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(CommunicationsTable);
