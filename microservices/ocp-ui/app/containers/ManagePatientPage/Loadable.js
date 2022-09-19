/**
 *
 * Asynchronously loads the component for ManagePatientPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
