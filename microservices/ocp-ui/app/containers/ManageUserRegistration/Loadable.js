/**
 *
 * Asynchronously loads the component for ManageUserRegistration
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
