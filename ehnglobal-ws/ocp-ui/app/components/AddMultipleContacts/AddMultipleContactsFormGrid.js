import { Grid } from 'styled-css-grid';

const AddMultipleContactsFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "firstName"
    "lastName"
    "purpose"
    "email"
    "phone"
    "line1"
    "line2"
    "city"
    "state"
    "postalCode"
    "country"
    "buttonGroup";

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "firstName firstName firstName firstName lastName lastName lastName lastName purpose purpose purpose purpose"
      "email email email email email email phone phone phone phone phone phone"
      "line1 line1 line1 line1 line1 line1 line2 line2 line2 line2 line2 line2"
      "city city city city city city state state state state state state"
      "postalCode postalCode postalCode postalCode postalCode postalCode country country country country country country"
      "buttonGroup buttonGroup buttonGroup buttonGroup buttonGroup buttonGroup buttonGroup . . . . .";
  }
`;

AddMultipleContactsFormGrid.propTypes = {};

export default AddMultipleContactsFormGrid;
