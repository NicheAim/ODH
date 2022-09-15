import styled from 'styled-components';
import PropType from 'prop-types';

const StyledConsentHeaderDetails = styled.div`
  margin-top: 5px;
  border-top: ${(props) => props.expanded && '1px solid rgba(153, 153, 153, 1)'};
  overflow: hidden;
  transition: height 300ms;
  height: ${(props) => props.expanded ? '150px' : '0px'};
`;

StyledConsentHeaderDetails.propTypes = {
  expanded: PropType.bool.isRequired,
};

StyledConsentHeaderDetails.defaultProps = {
  expanded: false,
};

export default StyledConsentHeaderDetails;
