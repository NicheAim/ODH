/**
 *
 * Asynchronously loads the component for ChangePassword
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
