/**
 *
 * Asynchronously loads the component for PatientAppointments
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
