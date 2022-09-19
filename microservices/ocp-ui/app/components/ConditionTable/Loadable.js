/**
 *
 * Asynchronously loads the component for ConditionTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
