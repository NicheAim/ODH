/**
 *
 * Asynchronously loads the component for ManageTask
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
