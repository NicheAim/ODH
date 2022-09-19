/**
 *
 * Asynchronously loads the component for Coverages
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
