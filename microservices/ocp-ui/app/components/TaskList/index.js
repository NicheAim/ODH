/**
*
* TaskList
*
*/

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import sizeMeHOC from 'utils/SizeMeUtils';
import PropTypes from 'prop-types';
import Padding from 'components/Padding';
import TaskAccordion from 'components/TaskAccordion';
import {
  SUMMARY_VIEW_WIDTH, SUMMARIZED_TABLE_COLUMNS, EXPANDED_TABLE_COLUMNS,
} from 'components/TaskList/constants';

function TaskList(props) {
  const { handleTaskClick, tasks, taskBaseUrl, patientId, isPatient, isPractitioner, openDialog, size, communicationBaseUrl } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
  return (
    <div>
      <Padding top={10} right={10} bottom={10} left={10}>
        {tasks && tasks.length > 0 &&
        <div>
          {!isEmpty(tasks) && tasks.map((task) =>
              (<TaskAccordion
                key={task.logicalId}
                task={task}
                columns={columns}
                taskBaseUrl={taskBaseUrl}
                isPractitioner={isPractitioner}
                isPatient={isPatient}
                patientId={patientId}
                openDialog={openDialog}
                communicationBaseUrl={communicationBaseUrl}
                handleTaskClick={handleTaskClick}
              >
              </TaskAccordion>)
            )
          }
        </div>
      }
      </Padding>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  patientId: PropTypes.string,
  taskBaseUrl: PropTypes.string,
  communicationBaseUrl: PropTypes.string,
  isPatient: PropTypes.bool,
  isPractitioner: PropTypes.bool,
  openDialog: PropTypes.func,
  handleTaskClick: PropTypes.func,
  size: PropTypes.object,
};

export default sizeMeHOC(TaskList);
