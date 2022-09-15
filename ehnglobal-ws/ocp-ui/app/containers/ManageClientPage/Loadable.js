/**
 *
 * Asynchronously loads the component for ManageClientPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
