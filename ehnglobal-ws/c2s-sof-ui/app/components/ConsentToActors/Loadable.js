/**
 *
 * Asynchronously loads the component for ConsentToActors
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
