/**
 *
 *   Asynchronously loads the component for ManagePatient
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
