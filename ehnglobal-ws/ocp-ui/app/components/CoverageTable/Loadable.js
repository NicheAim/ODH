/**
 *
 * Asynchronously loads the component for CoverageTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
