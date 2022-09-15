import { Grid } from 'styled-css-grid';

const ManageAppointmentFormGrid = Grid.extend`
  width: auto;
  margin: 1vh 1vw;
  grid-row-gap: 0.5vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "selectedPatient"
    "appointmentType"
    "appointmentRequired"
    "addParticipant"
    "date"
    "startTime"
    "endTime"
    "description"
    "appointmentStatus"
    "buttonGroup";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "selectedPatient selectedPatient"
      "appointmentType"
      "appointmentRequired"
      "addParticipant addParticipant"
      "date"
      "startTime"
      "endTime"
      "description"
      "appointmentStatus"
      "buttonGroup .";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient"
      "appointmentType appointmentType appointmentType appointmentStatus appointmentStatus . . . . . . ."
      "appointmentRequired appointmentRequired . . . . . . . . . ."
      "addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant addParticipant"
      "date date . . . . . . . . . ."
      "startTime startTime endTime endTime . . . . . . . ."
      "description description description description . . . . . . . ."
      "buttonGroup buttonGroup buttonGroup . . . . . . . . .";
  }
`;

ManageAppointmentFormGrid.propTypes = {};

export default ManageAppointmentFormGrid;
