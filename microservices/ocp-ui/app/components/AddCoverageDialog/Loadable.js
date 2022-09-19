/**
 *
 * Asynchronously loads the component for AddCoverageDialog
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
