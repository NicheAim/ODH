/**
 *
 * Asynchronously loads the component for ManageLocation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
