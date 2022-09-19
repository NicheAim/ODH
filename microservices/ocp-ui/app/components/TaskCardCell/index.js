/**
*
* TaskCardCell
*
*/

import { Cell } from 'styled-css-grid';

const TaskCardCell = Cell.extend`
  border-radius: 5px;
  font-size: 12px;
  padding-bottom: 5px;
  padding-right: 0 !important;
`;

TaskCardCell.propTypes = {};

export default TaskCardCell;
