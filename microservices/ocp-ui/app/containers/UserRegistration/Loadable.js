/**
 *
 * Asynchronously loads the component for UserRegistration
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
