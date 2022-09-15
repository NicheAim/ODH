import renderFactory from 'utils/goldenLayout/renderFactory';
import { Goals } from '../Goals';
import { render } from '../Goals/render';

class GoalsBehavioral extends Goals {}

const goalType = 'behavioral';
const useContextDisplayFilter = 'Behavioral%20health';

export default renderFactory(
  render(GoalsBehavioral, goalType),
  {
    goalType,
    useContextDisplayFilter,
  }
);
