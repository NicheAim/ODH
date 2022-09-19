import PropTypes from 'prop-types';
import { Grid } from 'styled-css-grid';
import { PREFIX, MAIN, SUFFIX } from './constants';

const StyledFieldGroupGrid = Grid.extend`
  grid-template-columns: 1fr;
  grid-template-areas: "${PREFIX}" "${MAIN}"${(props) => props.withSuffix ? ` "${SUFFIX}"` : ''};

  @media (min-width: 768px) {
    grid-template-columns: ${(props) => props.withSuffix ? '1fr 2fr 1fr' : '1fr 2fr'};
    grid-template-areas: "${PREFIX} ${MAIN}${({ withSuffix }) => withSuffix ? ` ${SUFFIX}` : ''}";
  }
`;

StyledFieldGroupGrid.propTypes = {
  ...Grid.propTypes,
  withSuffix: PropTypes.bool,
};

StyledFieldGroupGrid.defaultProps = {
  withSuffix: false,
};

export default StyledFieldGroupGrid;
