/**
 *
 * Asynchronously loads the component for ManageFormGrid
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
