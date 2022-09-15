/**
*
* TodoList
*
*/

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import sizeMeHOC from 'utils/SizeMeUtils';
import PropTypes from 'prop-types';
import Padding from 'components/Padding';
import ToDoAccordion from 'components/ToDoAccordion';
import {
  SUMMARY_VIEW_WIDTH, SUMMARIZED_TABLE_COLUMNS, EXPANDED_TABLE_COLUMNS,
} from 'components/ToDoList/constants';

function ToDoList(props) {
  const { handleToDoClick, toDos, taskBaseUrl, patientId, isPatient, isPractitioner, openDialog, size, communicationBaseUrl } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
  return (
    <div>
      <Padding top={10} right={10} bottom={10} left={10}>
        {toDos && toDos.length > 0 &&
        <div>
          {!isEmpty(toDos) && toDos.map((toDo) =>
              (<ToDoAccordion
                key={toDo.logicalId}
                toDo={toDo}
                columns={columns}
                taskBaseUrl={taskBaseUrl}
                isPractitioner={isPractitioner}
                isPatient={isPatient}
                patientId={patientId}
                openDialog={openDialog}
                communicationBaseUrl={communicationBaseUrl}
                handleToDoClick={handleToDoClick}
              >
              </ToDoAccordion>)
            )
          }
        </div>
      }
      </Padding>
    </div>
  );
}

ToDoList.propTypes = {
  toDos: PropTypes.array.isRequired,
  patientId: PropTypes.string,
  taskBaseUrl: PropTypes.string,
  communicationBaseUrl: PropTypes.string,
  isPatient: PropTypes.bool,
  isPractitioner: PropTypes.bool,
  openDialog: PropTypes.func,
  handleToDoClick: PropTypes.func,
  size: PropTypes.object,
};

export default sizeMeHOC(ToDoList);
