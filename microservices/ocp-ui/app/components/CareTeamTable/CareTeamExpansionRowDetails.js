import Align from 'components/Align/index';
import InfoSection from 'components/InfoSection';
import StyledText from 'components/StyledText/index';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TextLabelGroup from 'components/TextLabelGroup';
import uniqueId from 'lodash/uniqueId';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import messages from './messages';

function CareTeamExpansionRowDetails({ careTeam, participants }) {
  const column = '2.5fr 3fr 3fr 3.5fr 3fr';
  const { categoryDisplay, name, reasonDisplay, startDate, endDate, statusDisplay } = careTeam;
  return (
    <div>
      <InfoSection>
        <Grid columns={'15% 15% 15% 15% 15% 15%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.name} />}
              text={name}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.status} />}
              text={statusDisplay}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.category} />}
              text={categoryDisplay}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.reason} />}
              text={reasonDisplay}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.startDate} />}
              text={startDate}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.endDate} />}
              text={endDate}
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
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.name} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.participantType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.role} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.startDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.expansionRowDetails.endDate} /></TableHeaderColumn>
        </TableHeader>
      </Table>
      {participants && participants.length > 0 ?
        participants.map((participant) => {
          const { memberFirstName, memberLastName, memberType, roleDisplay } = participant;
          const fullName = (memberFirstName) ? memberFirstName.concat(' ').concat(memberLastName) : '';
          const memTyp = (memberType) ? upperFirst(memberType) : '';
          const rolDis = (roleDisplay) ? upperFirst(roleDisplay) : '';
          return (
            <TableRow key={uniqueId()} columns={column}>
              <TableRowColumn>{fullName}</TableRowColumn>
              <TableRowColumn>{memTyp}</TableRowColumn>
              <TableRowColumn>{rolDis}</TableRowColumn>
              <TableRowColumn>{participant.startDate}</TableRowColumn>
              <TableRowColumn>{participant.endDate}</TableRowColumn>
            </TableRow>
          );
        }) : (
          <TableRow>
            <TableRowColumn>
              <span><FormattedMessage {...messages.expansionRowDetails.noParticipantAdded} /></span>
            </TableRowColumn>
          </TableRow>)
      }
    </div>
  );
}

CareTeamExpansionRowDetails.propTypes = {
  careTeam: PropTypes.object.isRequired,
  participants: PropTypes.array,
};

export default CareTeamExpansionRowDetails;
