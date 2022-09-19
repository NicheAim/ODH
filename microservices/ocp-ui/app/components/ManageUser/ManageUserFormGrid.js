import { Grid } from 'styled-css-grid';

const ManageUserFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "firstName"
    "lastName"
    "username"
    "resetPassword"
    "password"
    "repeatPassword"
    "removeUser"
    "assignPermissionGroupSubtitle"
    "organization"
    "group"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName"
      "lastName lastName"
      "username username"
      "resetPassword removeUser"
      "password password"
      "repeatPassword repeatPassword"
      "assignPermissionGroupSubtitle assignPermissionGroupSubtitle"
      "organization organization"
      "group group"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName firstName firstName lastName lastName lastName lastName . . . ."
      "username username username username resetPassword resetPassword removeUser removeUser . . . ."
      "password password password password repeatPassword repeatPassword repeatPassword repeatPassword . . . ."
      "assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle assignPermissionGroupSubtitle"
      "organization organization organization organization organization . . . . . . ."
      "group group group group group . . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageUserFormGrid.propTypes = Grid.propTypes;

export default ManageUserFormGrid;
