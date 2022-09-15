import { Grid } from 'styled-css-grid';

const ExpansionRowDetailsGrid = Grid.extend`
  margin-bottom: 2vh;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "name"
    "identifier"
    "status"
    "addresses"
    "telecoms";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name name"
      "identifier identifier"
      "status status"
      "addresses addresses"
      "telecoms telecoms";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "name name name name identifier identifier identifier identifier status status status status"
      "addresses addresses addresses addresses telecoms telecoms telecoms telecoms . . . .";
  }
`;

ExpansionRowDetailsGrid.propTypes = {};

export default ExpansionRowDetailsGrid;
