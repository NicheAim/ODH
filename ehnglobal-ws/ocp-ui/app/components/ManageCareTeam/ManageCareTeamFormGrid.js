import { Grid } from 'styled-css-grid';

const ManageCareTeamFormGrid = Grid.extend`
  width: auto;
  margin: 1vh 1vw;
  grid-row-gap: 0.5vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "selectedPatient"
    "careTeamName"
    "category"
    "status"
    "episodeOfCare"
    "reason"
    "startDate"
    "endDate"
    "participantSubtitle"
    "addParticipant"
    "selectedParticipants"
    "buttonGroup";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "selectedPatient selectedPatient"
      "careTeamName status"
      "category ."
      "episodeOfCare ."
      "reason reason"
      "startDate ."
      "endDate ."
      "participantSubtitle participantSubtitle"
      "addParticipant ."
      "selectedParticipants selectedParticipants"
      "buttonGroup .";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient"
      "careTeamName careTeamName careTeamName careTeamName category category category status status . . ."
      "episodeOfCare episodeOfCare episodeOfCare reason reason reason reason . . . . ."
      "startDate startDate endDate endDate . . . . . . . ."
      "participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle"
      "addParticipant addParticipant . . . . . . . . . ."
      "selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants"
      "buttonGroup buttonGroup buttonGroup . . . . . . . . .";
  }
`;

ManageCareTeamFormGrid.propTypes = {};

export default ManageCareTeamFormGrid;
