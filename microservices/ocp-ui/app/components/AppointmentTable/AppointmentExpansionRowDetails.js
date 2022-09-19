import Align from 'components/Align/index';
import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText/index';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TextLabelGroup from 'components/TextLabelGroup';
import camelCase from 'lodash/camelCase';
import isUndefined from 'lodash/isUndefined';
import startCase from 'lodash/startCase';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { getRoleName } from 'utils/CommunicationUtils';
import { combineAddress } from 'utils/PatientUtils';
import messages from './messages';

function AppointmentExpansionRowDetails({ participants, appointmentType, locationObject }) {
  const column = '2.5fr 3fr 3fr 3.5fr 3fr';
  const addressObject = (!isUndefined(locationObject) && locationObject !== null) ? locationObject.address : null;
  const address = (!isUndefined(addressObject) && addressObject !== null ? combineAddress(addressObject) : 'N/A');
  return (
    <div>
      <InfoSection>
        <Grid columns={'25% 25% 25% 25%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.appointmentType} />}
              text={appointmentType}
            />
          </Cell>
        </Grid>
        <Grid columns={'100%'} justifyContent="space-between">
          <Cell>
            <StyledText>
              <Align variant={'left'}>
                {<FormattedMessage {...messages.expansionRowDetails.participants} />}
              </Align>
            </StyledText>
          </Cell>
        </Grid>
      </InfoSection>
      <Table>
        <TableHeader columns={column}>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.appointmentParticipantName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.participantType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.contactDetails} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.participationType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.status} /></TableHeaderColumn>
        </TableHeader>
        {participants && participants.length > 0 ?
          participants.map((participant) => {
            const { actorName, actorReference, participationStatusCode, participationTypeDisplay, phone, email, location } = participant;
            return (
              <TableRow key={uniqueId()} columns={column}>
                <TableRowColumn>{actorName}</TableRowColumn>
                <TableRowColumn>{getRoleName(actorReference)}</TableRowColumn>
                {
                  location ? <TableRowColumn>Phone: {phone} <br></br> Email: {email} <br></br> Address: {address}
                  </TableRowColumn> : <TableRowColumn>Phone: {phone} <br></br> Email: {email}</TableRowColumn>
                }
                <TableRowColumn>{startCase(camelCase(participationTypeDisplay))}</TableRowColumn>
                <TableRowColumn>{startCase(camelCase(participationStatusCode))}</TableRowColumn>
              </TableRow>
            );
          }) : (
            <TableRow>
              <TableRowColumn>
                <span><FormattedMessage {...messages.expansionRowDetails.noParticipantAdded} /></span>
              </TableRowColumn>
            </TableRow>)
        }
      </Table>
    </div>
  );
}

AppointmentExpansionRowDetails.propTypes = {
  participants: PropTypes.array,
  appointmentType: PropTypes.string,
  locationObject: PropTypes.object,
};

export default AppointmentExpansionRowDetails;
