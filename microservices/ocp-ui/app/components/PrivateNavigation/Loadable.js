/**
 *
 * Asynchronously loads the component for PrivateNavigation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
