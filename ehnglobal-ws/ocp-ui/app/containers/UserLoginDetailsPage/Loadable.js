/**
 *
 * Asynchronously loads the component for UserLoginDetailsPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
