import { Grid } from 'styled-css-grid';

const AttestConsentGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 0 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "patientGroup"
    "consentActorsGroup"
    "purposeOfUseGroup"
    "consentTerm"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "patientGroup patientGroup"
      "consentActorsGroup consentActorsGroup"
      "disclose disclose"
      "purposeOfUseGroup purposeOfUseGroup"
      "consentTerm consentTerm"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup patientGroup"
      "consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup consentActorsGroup"
      "purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup"
      "consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;


AttestConsentGrid.propTypes = Grid.propTypes;

export default AttestConsentGrid;
