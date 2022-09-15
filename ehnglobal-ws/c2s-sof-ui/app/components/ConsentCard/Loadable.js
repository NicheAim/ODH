/**
 *
 * Asynchronously loads the component for ConsentCard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
