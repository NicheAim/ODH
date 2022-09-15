import { createSelector } from 'reselect';
import { getNamespace } from './utils';

export function makeSelectGoals() {

  const namespace = 'PatientsPage'
  const selectGoalsDomain = (state) => state.get(namespace);

  return () =>
    createSelector(
      selectGoalsDomain,
      (substate) => substate && substate.toJS()
    );
}


// export function makeSelectGoals(goalType) {

//   const namespace = getNamespace(goalType);
//   const selectGoalsDomain = (state) => state.get(namespace);

//   return () =>
//     createSelector(
//       selectGoalsDomain,
//       (substate) => substate && substate.toJS()
//     );
// }
