import PropTypes from 'prop-types';

import sizeMeHOC from 'utils/SizeMeUtils';
import StickyDiv from './index';

const SizedStickyDiv = sizeMeHOC(StickyDiv);

SizedStickyDiv.propTypes = {
  onSize: PropTypes.func,
  ...StickyDiv.propTypes,
};

export default SizedStickyDiv;
