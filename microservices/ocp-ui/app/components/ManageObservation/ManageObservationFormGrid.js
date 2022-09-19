import { Grid } from 'styled-css-grid';

const ManageObservationFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 0vh;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
    "selOrganization . . ."
    "patientName . . ."
    "observationIssued . . ."
    "observationCode . . ." 
    "observationValue . . ."
    "buttonGroup . . .";
`;

ManageObservationFormGrid.propTypes = Grid.propTypes;

export default ManageObservationFormGrid;
