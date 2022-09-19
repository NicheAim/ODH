import { Grid } from 'styled-css-grid';

const ManageOrganizationFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "name"
    "identifierGroup"
    "status"
    "addresses"
    "telecoms"
    "contacts"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "name name"
      "identifierGroup identifierGroup"
      "status status"
      "addresses addresses"
      "telecoms telecoms"
      "contacts contacts"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "name name name name identifierGroup identifierGroup identifierGroup identifierGroup status status status status"
      "addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses"
      "telecoms telecoms telecoms telecoms telecoms telecoms telecoms telecoms telecoms telecoms telecoms telecoms"
      "contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageOrganizationFormGrid.propTypes = {};

export default ManageOrganizationFormGrid;
