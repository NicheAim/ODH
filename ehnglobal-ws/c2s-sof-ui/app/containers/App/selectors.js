import { createSelector } from 'reselect';

const selectGlobalDomain = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const makeSelectConfig = () => createSelector(
  selectGlobalDomain,
  (globalState) => globalState.get('config') && globalState.get('config').toJS(),
);

export default selectGlobalDomain;

export {
  makeSelectLocation,
  makeSelectConfig,
};
