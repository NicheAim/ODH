import { Grid } from 'styled-css-grid';

const ManagePractitionerFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "firstName"
    "lastName"
    "identifierGroup"
    "addresses"
    "contacts"
    "associateOrganizationSection"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "firstName lastName"
      "identifierGroup identifierGroup"
      "addresses addresses"
      "contacts contacts"
      "associateOrganizationSection associateOrganizationSection"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName firstName firstName lastName lastName lastName lastName . . . ."
      "identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . . ."
      "addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses"
      "contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"
      "associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManagePractitionerFormGrid.propTypes = Grid.propTypes;

export default ManagePractitionerFormGrid;
