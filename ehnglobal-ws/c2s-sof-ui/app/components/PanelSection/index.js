/**
 *
 * PanelSection
 *
 */

import Section from 'components/Section';


const PanelSection = Section.extend`
  margin: 10px 0;
  border-radius: 5px;

  &:hover {
    border: 1px solid rgba(0, 165, 153, 1);
    border-radius: 5px;
  }
`;

PanelSection.propTypes = {};

export default PanelSection;
