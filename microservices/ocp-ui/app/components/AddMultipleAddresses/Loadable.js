/**
 *
 * Asynchronously loads the component for AddMultipleAddresses
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
