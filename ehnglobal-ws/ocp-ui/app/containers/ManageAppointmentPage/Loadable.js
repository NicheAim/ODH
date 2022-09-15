/**
 *
 * Asynchronously loads the component for ManageAppointmentPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
