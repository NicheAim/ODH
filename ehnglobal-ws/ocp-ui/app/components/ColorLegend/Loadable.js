/**
 *
 * Asynchronously loads the component for ColorLegend
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
