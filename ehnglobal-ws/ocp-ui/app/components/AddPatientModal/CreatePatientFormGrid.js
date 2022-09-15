import { Grid } from 'styled-css-grid';

const CreatePatientForm = Grid.extend`
  margin-bottom: 2vh;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "firstName"
    "lastName"
    "birthDate"
    "button";

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "firstName firstName firstName firstName firstName firstName lastName lastName lastName lastName lastName lastName"
      "birthDate birthDate birthDate birthDate birthDate birthDate birthDate birthDate . . . ."
      "button button button button button button button . . . . .";
  }
`;

CreatePatientForm.propTypes = {};

export default CreatePatientForm;
