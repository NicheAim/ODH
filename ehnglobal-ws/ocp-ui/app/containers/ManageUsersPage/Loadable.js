/**
 *
 * Asynchronously loads the component for ManageUsersPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
