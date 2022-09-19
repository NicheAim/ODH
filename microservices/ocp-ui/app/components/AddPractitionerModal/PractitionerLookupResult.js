/**
 *
 * PractitionerLookupResult
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui-next/Divider';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import InfoSection from 'components/InfoSection';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NavigationIconMenu from 'components/NavigationIconMenu';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledText from 'components/StyledText';
import { flattenPractitioner } from './helpers';
import messages from './messages';

const columns = '.5fr .6fr  repeat(3, 1fr) .5fr';

function PractitionerLookupResult(props) {
  const { practitionerLookup: { loading, practitioner, exists, error }, isOrgAdmin } = props;
  const managePractitionerUrl = '/ocp-ui/manage-practitioner';

  function renderPractitionerTable() {
    const flattenedPractitioner = flattenPractitioner(practitioner);
    const menuItems = isOrgAdmin ? [{
      primaryText: <FormattedMessage {...messages.associateCurrentOrganization} />,
      linkTo: `${managePractitionerUrl}/${practitioner.logicalId}`,
    }] : [{
      primaryText: <FormattedMessage {...messages.edit} />,
      linkTo: `${managePractitionerUrl}/${practitioner.logicalId}`,
    }];
    return (
      <div>
        <FormattedMessage {...messages.modalContentText} />
        <Divider light />
        <Table>
          <TableHeader columns={columns}>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnOrgName} /></TableHeaderColumn>
            <TableHeaderColumn> <FormattedMessage {...messages.tableColumnHeaderRole} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderEmail} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
          </TableHeader>
          <TableRow key={uniqueId()} columns={columns}>
            <TableRowColumn>{flattenedPractitioner.name}</TableRowColumn>
            <TableRowColumn>{flattenedPractitioner.identifiers}</TableRowColumn>
            <TableRowColumn>
              <StyledText>{flattenedPractitioner.orgName}</StyledText>
            </TableRowColumn>
            <TableRowColumn>{flattenedPractitioner.roles}</TableRowColumn>
            <TableRowColumn>{flattenedPractitioner.email}</TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        </Table>
        {renderCreateNewRecordButton()}
      </div>
    );
  }

  function renderCreateNewRecordButton() {
    return (
      <InfoSection margin="10px 0px">
        <StyledRaisedButton component={Link} to={managePractitionerUrl}>
          <FormattedMessage {...messages.createButton} />
        </StyledRaisedButton>
      </InfoSection>
    );
  }

  return (
    <div>
      <LinearProgressIndicator loading={loading} />
      {error !== false && !exists &&
      <div>
        <FormattedMessage {...messages.NoExistPractitionerFound} />
        {renderCreateNewRecordButton()}
      </div>
      }
      {!loading && exists && renderPractitionerTable()}
    </div>
  );
}

PractitionerLookupResult.propTypes = {
  practitionerLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    exists: PropTypes.bool.isRequired,
    practitioner: PropTypes.shape({
      name: PropTypes.array,
      identifiers: PropTypes.array,
      telecoms: PropTypes.array,
      practitionerRoles: PropTypes.array,
    }),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }).isRequired,
  isOrgAdmin: PropTypes.bool.isRequired,
};

export default PractitionerLookupResult;
