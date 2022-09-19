import { Grid } from 'styled-css-grid';

const ManageLocationFormGrid = Grid.extend`
  padding-left: 1vw;
  padding-right: 1vw;
  margin: 0 1vw;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "organizationName"
    "name"
    "status"
    "locationType"
    "identifierGroup"
    "contact"
    "addressSubtitle"
    "address1"
    "address2"
    "city"
    "state"
    "postalCode"
    "countryCode"
    "addressUse"
    "buttonGroup"
    "errorMessage";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "organizationName organizationName"
      "name status"
      "locationType locationType"
      "identifierGroup identifierGroup"
      "identifierGroup identifierGroup"
      "contact contact"
      "addressSubtitle addressSubtitle"
      "address1 address2"
      "city state postalCode"
      "countryCode addressUse"
      "buttonGroup ."
      "errorMessage errorMessage";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName"
      "name name name name status status status . . . . ."
      "locationType locationType identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . ."
      "contact contact contact contact contact contact contact contact contact contact contact contact"
      "addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle"
      "address1 address1 address1 address1 address2 address2 address2 address2 . . . ."
      "city city city city state state state postalCode postalCode . . ."
      "countryCode countryCode countryCode addressUse addressUse addressUse . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."
      "errorMessage errorMessage . . . . . . . . . .";
  }
`;

ManageLocationFormGrid.propTypes = {};

export default ManageLocationFormGrid;
