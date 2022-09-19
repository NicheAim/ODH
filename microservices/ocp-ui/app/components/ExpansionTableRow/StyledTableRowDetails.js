import styled from 'styled-components';
import PropType from 'prop-types';

const StyledTableRowDetails = styled.div`
  background-color: #f8f8f8;
  border: ${(props) => props.expanded && '1px solid rgba(204, 204, 204, 1)'};
  border-top: 0;
  overflow: hidden;
  transition: height 300ms;
  height: ${(props) => props.expanded ? props.height : '0px'};
`;

StyledTableRowDetails.propTypes = {
  height: PropType.string.isRequired,
  expanded: PropType.bool.isRequired,
};

StyledTableRowDetails.defaultProps = {
  expanded: false,
  height: '0px',
};

export default StyledTableRowDetails;
