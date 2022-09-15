/**
 *
 * Asynchronously loads the component for HealthcareServiceTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
