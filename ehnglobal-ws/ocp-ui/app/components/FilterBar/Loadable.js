/**
 *
 * Asynchronously loads the component for FilterBar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
