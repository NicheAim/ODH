/**
 *
 * Asynchronously loads the component for PermissionsGroups
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
