import Align from './index';

const variant = 'center';

const CenterAlign = Align.extend`
  text-align: ${variant};
`;

CenterAlign.propTypes = {};

export default CenterAlign;
