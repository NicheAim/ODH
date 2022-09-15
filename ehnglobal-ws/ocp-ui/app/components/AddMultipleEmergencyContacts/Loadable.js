/**
 *
 * Asynchronously loads the component for AddMultipleTelecoms
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
