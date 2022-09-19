import Align from './index';

const variant = 'left';

const LeftAlign = Align.extend`
  text-align: ${variant};
`;

LeftAlign.propTypes = {};

export default LeftAlign;
