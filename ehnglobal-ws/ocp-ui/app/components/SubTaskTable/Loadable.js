/**
 *
 * Asynchronously loads the component for SubTaskTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
