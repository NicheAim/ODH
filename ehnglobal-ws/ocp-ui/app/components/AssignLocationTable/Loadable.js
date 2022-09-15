/**
 *
 * Asynchronously loads the component for AssignLocationTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
