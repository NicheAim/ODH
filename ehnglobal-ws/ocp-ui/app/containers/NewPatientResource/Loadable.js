/**
 *
 * Asynchronously loads the component for NewPatientResource
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
