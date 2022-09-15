import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import messages from './messages';


function CommunicationExpansionRowDetails({ communication }) {
  const { payloadContent, note, notDoneReasonValue, statusValue, statusCode, mediumValue, duration } = communication;
  return (
    <div>
      <InfoSection>
        <Grid columns={'30% 30% 30%'} justifyContent="space-between">
          <Cell>
            {statusCode === 'not-done' ||
            statusCode === 'in-progress' ||
            statusCode === 'on-hold' ||
            statusCode === 'stopped' ||
            statusCode === 'unknown' ||
            statusCode === 'entered-in-error' ? (
              <TextLabelGroup
                label={
                  <FormattedMessage
                    {...messages.expansionRowDetails.noCommunicatonReason}
                  />
                }
                text={notDoneReasonValue}
              />
            ) : (
              <TextLabelGroup
                label={
                  <FormattedMessage {...messages.expansionRowDetails.communicationOcurred} />
                }
              />
            )}
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.status} />}
              text={statusValue}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.medium} />}
              text={upperFirst(mediumValue)}
            />
          </Cell>
        </Grid>
        <Grid columns={'30% 30% 30%'} justifyContent="space-between">
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.message} />}
              text={payloadContent}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.note} />}
              text={note}
            />
          </Cell>
          <Cell>
            <TextLabelGroup
              label={<FormattedMessage {...messages.expansionRowDetails.duration} />}
              text={duration}
            />
          </Cell>
        </Grid>
      </InfoSection>
    </div>
  );
}

CommunicationExpansionRowDetails.propTypes = {
  communication: PropTypes.object.isRequired,
};

export default CommunicationExpansionRowDetails;
