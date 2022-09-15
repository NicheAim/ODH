/**
 *
 * Asynchronously loads the component for AppointmentsCalendar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
