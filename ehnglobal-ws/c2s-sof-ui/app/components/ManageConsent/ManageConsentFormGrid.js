import { Grid } from 'styled-css-grid';

const ManageConsentFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 0 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "careTeamGroup"
    "medicalInfoGroup"
    "purposeOfUseGroup"
    "consentTermGroup"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "careTeamGroup careTeamGroup"
      "medicalInfoGroup medicalInfoGroup"
      "purposeOfUseGroup purposeOfUseGroup"
      "consentTermGroup consentTermGroup"
      "buttonGroup buttonGroup";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup"
      "medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup"
      "purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup"
      "consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;


ManageConsentFormGrid.propTypes = Grid.propTypes;

export default ManageConsentFormGrid;
