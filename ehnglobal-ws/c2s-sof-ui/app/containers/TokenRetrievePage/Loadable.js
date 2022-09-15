/**
 *
 * Asynchronously loads the component for TokenRetrievePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
