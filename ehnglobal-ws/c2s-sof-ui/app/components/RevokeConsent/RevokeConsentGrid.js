import { Grid } from 'styled-css-grid';

const RevokeConsentGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 0 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "revocationConsentGroup"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "revocationConsentGroup revocationConsentGroup"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup revocationConsentGroup"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

RevokeConsentGrid.propTypes = Grid.propTypes;

export default RevokeConsentGrid;
