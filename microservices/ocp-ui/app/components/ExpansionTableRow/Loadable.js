/**
 *
 * Asynchronously loads the component for ExpansionTableRow
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
