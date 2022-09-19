import PropType from 'prop-types';
import styled from 'styled-components';

const StyledExpansionDetails = styled.div`
  margin-top: 5px;
  background-color: rgba(240, 248, 250, 1);
  border: ${(props) => props.expanded && '1px solid rgba(204, 204, 204, 1)'};
  overflow: hidden;
  transition: height 300ms;
  height: ${(props) => (props.expanded ? '360px' : '0px')};
`;

StyledExpansionDetails.propTypes = {
  expanded: PropType.bool.isRequired,
};

StyledExpansionDetails.defaultProps = {
  expanded: false,
};

export default StyledExpansionDetails;
