/**
 *
 * AddedConsentActorsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import red from 'material-ui-next/colors/red';

import InfoSection from 'components/InfoSection';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';


function AddedConsentActorsTable(props) {
  const tableColumns = '30% 15% 1fr 50px';
  const { actors, arrayHelpers, disabledRemoveButton } = props;
  return (
    <div>
      <InfoSection margin="10px -10px">
        <Table>
          <TableHeader columns={tableColumns}>
            <TableHeaderColumn><FormattedMessage {...messages.name} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.type} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.identifier} /></TableHeaderColumn>
          </TableHeader>
          {actors && actors.map((actor, index) => {
            const { display, reference, identifiers } = actor;
            return (
              <TableRow key={uniqueId()} columns={tableColumns}>
                <TableRowColumn>{display}</TableRowColumn>
                <TableRowColumn>{reference.type}</TableRowColumn>
                <TableRowColumn>{mapToIdentifiers(identifiers)}</TableRowColumn>
                <StyledIconButton
                  size="x-small"
                  svgIconSize="medium"
                  onClick={() => arrayHelpers.remove(index)}
                  disabled={disabledRemoveButton}
                >
                  <DeleteIcon color={disabledRemoveButton ? 'rgba(0, 0, 0, 0.3)' : red['800']} />
                </StyledIconButton>
              </TableRow>
            );
          })}
        </Table>
      </InfoSection>
    </div>
  );
}

function mapToIdentifiers(identifiers) {
  const EMPTY_STRING = '';
  const NEW_LINE_CHARACTER = '\n';
  return identifiers && identifiers.map((identifier) => {
    const system = identifier.systemDisplay !== EMPTY_STRING ? identifier.systemDisplay : EMPTY_STRING;
    const value = identifier.value !== EMPTY_STRING ? identifier.value : EMPTY_STRING;
    return `${system}: ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

AddedConsentActorsTable.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  arrayHelpers: PropTypes.shape({
    remove: PropTypes.func.isRequired,
  }).isRequired,
  disabledRemoveButton: PropTypes.bool,
};

AddedConsentActorsTable.defaultProps = {
  disabledRemoveButton: false,
};

export default AddedConsentActorsTable;
