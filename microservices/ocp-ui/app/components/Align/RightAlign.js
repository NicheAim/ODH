import Align from './index';

const variant = 'right';

const RightAlign = Align.extend`
  text-align: ${variant};
`;

RightAlign.propTypes = {};

export default RightAlign;
