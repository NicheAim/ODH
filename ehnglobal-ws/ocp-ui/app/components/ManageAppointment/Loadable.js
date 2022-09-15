/**
 *
 * Asynchronously loads the component for ManageAppointment
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
