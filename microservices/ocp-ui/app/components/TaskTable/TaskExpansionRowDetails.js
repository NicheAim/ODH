import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';

import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import messages from './messages';

function TaskExpansionRowDetails({ task }) {
  const { definition, owner, authoredOn, lastModified, executionPeriod, status, priority, intent, description, totalSubtasks } = task;
  return (
    <InfoSection>
      <Grid columns={'47% 53%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderActivityType} />}
            text={definition && definition.display}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderCreatedOn} />}
            text={authoredOn}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderTaskOwner} />}
            text={owner && owner.display}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderLastModified} />}
            text={lastModified}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderStatus} />}
            text={status.display}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderTaskPeriod} />}
            text={`${executionPeriod.start} - ${executionPeriod.end}`}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionDetailsPriority} />}
            text={priority.display}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionDetailsPurpose} />}
            text={intent.display}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.columnHeaderDescription} />}
            text={description}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.numberOfSubtasks} />}
            text={totalSubtasks}
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

TaskExpansionRowDetails.propTypes = {
  task: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    definition: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    status: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    priority: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    authoredOn: PropTypes.string,
    executionPeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    agent: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    owner: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    intent: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    lastModified: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default TaskExpansionRowDetails;
