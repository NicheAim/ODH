import { Grid } from 'styled-css-grid';

const ManageRelatedPersonFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "patientName"
    "active"
    "firstName"
    "lastName"
    "relationshipCode"
    "birthDate"
    "genderCode"
    "startDate"
    "endDate"
    "identifierGroup"
    "addresses"
    "contacts"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "patientName active"
      "firstName lastName"
      "relationshipCode ."
      "birthDate genderCode"
      "startDate endDate"
      "identifierGroup identifierGroup"
      "addresses addresses"
      "contacts contacts"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "patientName patientName patientName patientName . . . . . . . ."
      "active . . . . . . . . . . ."
      "firstName firstName lastName lastName . . . . . . . ."
      "relationshipCode relationshipCode birthDate birthDate genderCode . . . . . . ."
      "startDate startDate endDate endDate . . . . . . . ."
      "identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . ."
      "addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses"
      "contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageRelatedPersonFormGrid.propTypes = Grid.propTypes;

export default ManageRelatedPersonFormGrid;
