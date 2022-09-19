/**
 *
 * Asynchronously loads the component for TodoCardGrid
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
