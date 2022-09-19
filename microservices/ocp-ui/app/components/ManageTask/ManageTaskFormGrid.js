import { Grid } from 'styled-css-grid';

const ManageTaskFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "activityDefinition"
    "selOrganization"
    "patientName"
    "selRequester"
    "authoredOn"
    "lastModifiedDate"
    "status"
    "priority"
    "intent"
    "context"
    "taskOwner"
    "performerType"
    "partOf"
    "taskStart"
    "taskEnd"
    "description"
    "comments"
    "subTasksSection"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "activityDefinition activityDefinition"
      "selOrganization selOrganization"
      "patientName patientName"
      "selRequester selRequester"
      "authoredOn lastModifiedDate"
      "status priority"
      "intent context"
      "taskOwner taskOwner"
      "performerType performerType"
      "partOf partOf"
      "taskStart taskEnd"
      "description description"
      "comments comments"
      "subTasksSection subTasksSection"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "activityDefinition activityDefinition activityDefinition activityDefinition . . . . . . . ."
      "selOrganization selOrganization selOrganization selOrganization patientName patientName patientName patientName selRequester selRequester selRequester selRequester"
      "authoredOn authoredOn lastModifiedDate lastModifiedDate . . . . . . . ."
      "status status status priority priority priority intent intent intent context context context"
      "taskOwner taskOwner taskOwner taskOwner performerType performerType performerType performerType partOf partOf partOf partOf"
      "taskStart taskStart taskEnd taskEnd . . . . . . . ."
      "description description description . . . . . . . . ."
      "comments comments comments . . . . . . . . ."
      "subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageTaskFormGrid.propTypes = Grid.propTypes;

export default ManageTaskFormGrid;
