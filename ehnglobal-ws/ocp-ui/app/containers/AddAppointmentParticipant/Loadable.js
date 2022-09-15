/**
 *
 * Asynchronously loads the component for AddAppointmentParticipant
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
