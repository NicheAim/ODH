import { Grid } from 'styled-css-grid';

const ManageConditionFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    'generalInformationSubtitle'
    'patientName'
    'conditionCode'
    'diagnosisPriorityCode'
    'recordedDate'
    'buttonGroup';

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'generalInformationSubtitle generalInformationSubtitle'
      'patientName patientName'
      'conditionCode conditionCode'
      'diagnosisPriorityCode diagnosisPriorityCode'
      'recordedDate recordedDate'
      'buttonGroup  .';
  }
`;

ManageConditionFormGrid.propTypes = Grid.propTypes;

export default ManageConditionFormGrid;
