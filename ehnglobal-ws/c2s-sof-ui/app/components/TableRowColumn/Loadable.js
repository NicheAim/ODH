/**
 *
 * Asynchronously loads the component for TableRowColumn
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
