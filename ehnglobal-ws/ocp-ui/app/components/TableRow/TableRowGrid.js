import { Grid } from 'styled-css-grid';

const TableRowGrid = Grid.extend`
  border-bottom: 1px solid #ccc;

  &:nth-child(odd) {
    background-color: #fff;
  }

  &:first-child {
    background-color: #fff;
    font-size: 20px;
  }

  &:hover {
    background-color: #fcfcfc;
    cursor: pointer;
  }

  &:focus {
    background-color: #d4efef;
  }
`;

TableRowGrid.propTypes = {};

export default TableRowGrid;
