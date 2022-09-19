import { createSelector } from 'reselect';

/**
 * Direct selector to the conditions state domain
 */
const selectConditionsDomain = (state) => state.get('conditions');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Conditions
 */

const makeSelectConditions = () =>
  createSelector(selectConditionsDomain, (substate) =>
    substate.get('data').toJS()
  );

const makeSelectLoading = () =>
  createSelector(selectConditionsDomain, (substate) => substate.get('loading'));

const makeSelectConditionsTotalElements = () =>
  createSelector(
    selectConditionsDomain,
    (substate) => substate && substate.getIn(['data', 'totalElements'])
  );

export default makeSelectConditions;
export {
  selectConditionsDomain,
  makeSelectLoading,
  makeSelectConditionsTotalElements,
};
