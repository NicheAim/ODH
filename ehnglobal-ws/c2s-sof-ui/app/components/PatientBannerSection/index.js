/**
 *
 * PatientBannerSection
 *
 */

import styled from 'styled-components';
import common from 'material-ui-next/colors/common';


const PatientBannerSection = styled.div`
  border-radius: 6px;
  background-color: ${common.white};
  border: 3px solid rgba(0, 153, 153, 1);
  padding-top: 2px;
  font-size: 13px;
  margin-bottom: 6px;
`;

PatientBannerSection.propTypes = {};

export default PatientBannerSection;
