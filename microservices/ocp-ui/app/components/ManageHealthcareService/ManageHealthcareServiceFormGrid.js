import { Grid } from 'styled-css-grid';

const ManageHealthcareServiceFormGrid = Grid.extend`
  padding-left: 1vw;
  padding-right: 1vw;
  margin: 0 1vw;
  grid-template-columns: 1fr;
  grid-template-areas:
    "name"
    "programName"
    "category"
    "hcsType"
    "hcsSpecialty"
    "hcsReferralMethod"
    "telecomType"
    "telecomValue"
    "buttonGroup";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name programName"
      "category category"
      "hcsType hcsType"
      "hcsSpecialty hcsSpecialty"
      "hcsReferralMethod hcsReferralMethod"
      "telecomType telecomType"
      "telecomValue telecomValue"
      "buttonGroup .";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "name name name programName programName programName . . . . . ."
      "category category category hcsType hcsType hcsType hcsSpecialty hcsSpecialty hcsSpecialty hcsReferralMethod hcsReferralMethod hcsReferralMethod"
      "telecomType telecomType telecomValue telecomValue telecomValue telecomValue . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageHealthcareServiceFormGrid.propTypes = {};

export default ManageHealthcareServiceFormGrid;
