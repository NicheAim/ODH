/**
 *
 * Asynchronously loads the component for TableRow
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
