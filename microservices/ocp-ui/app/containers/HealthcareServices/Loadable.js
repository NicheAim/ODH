/**
 *
 * Asynchronously loads the component for HealthcareServices
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

