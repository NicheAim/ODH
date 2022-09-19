/**
 *
 * Asynchronously loads the component for AutoSuggestion
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
