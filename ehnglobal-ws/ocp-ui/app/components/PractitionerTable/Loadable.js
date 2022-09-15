/**
 *
 * Asynchronously loads the component for PractitionerTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
