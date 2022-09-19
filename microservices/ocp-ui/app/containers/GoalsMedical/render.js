import renderFactory from 'utils/goldenLayout/renderFactory';
import { Goals } from '../Goals';
import { render } from '../Goals/render';

class GoalsMedical extends Goals {}

const goalType = 'medical';
const useContextDisplayFilter = 'Medical%20Referral';

export default renderFactory(
  render(GoalsMedical, goalType),
  {
    goalType,
    useContextDisplayFilter,
  }
);
