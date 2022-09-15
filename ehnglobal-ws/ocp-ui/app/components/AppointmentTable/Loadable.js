/**
 *
 * Asynchronously loads the component for AppointmentTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
