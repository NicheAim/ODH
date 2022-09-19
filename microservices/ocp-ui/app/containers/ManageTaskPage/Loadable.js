/**
 *
 * Asynchronously loads the component for ManageTaskPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
