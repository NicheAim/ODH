import renderFactory from 'utils/goldenLayout/renderFactory';
import { Goals } from '../Goals';
import { render } from '../Goals/render';

class GoalsSocial extends Goals {}

const goalType = 'social';
const useContextDisplayFilter = 'Social%20Services';

export default renderFactory(
  render(GoalsSocial, goalType),
  {
    goalType,
    useContextDisplayFilter,
  }
);
