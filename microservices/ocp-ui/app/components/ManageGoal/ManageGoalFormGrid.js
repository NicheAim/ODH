import { Grid } from 'styled-css-grid';

const ManageGoalFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 0vh;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
    "selOrganization startDate . ."
    "patientName dueDate . ."
    "planId planId . ." 
    "lifecycleStatus achievementStatus . ."
    "owner owner . ."
    "description description . ."
    "buttonGroup . . .";
`;

ManageGoalFormGrid.propTypes = Grid.propTypes;

export default ManageGoalFormGrid;
