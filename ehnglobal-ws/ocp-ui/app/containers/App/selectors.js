import { createSelector } from 'reselect';

const selectGlobalDomain = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const selectRehydrated = (state) => state.get('rehydrated');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const makeSelectRehydrated = () => createSelector(
  selectRehydrated,
  (rehydrateState) => rehydrateState,
);

const makeSelectConfig = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get('config').toJS(),
);

export default selectGlobalDomain;

export {
  makeSelectLocation,
  makeSelectRehydrated,
  makeSelectConfig,
};
