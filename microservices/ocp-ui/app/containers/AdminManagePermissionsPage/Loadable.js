/**
 *
 * Asynchronously loads the component for AdminManagePermissionsPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
