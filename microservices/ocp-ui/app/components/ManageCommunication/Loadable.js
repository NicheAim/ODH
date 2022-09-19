/**
 *
 * Asynchronously loads the component for ManageCommunication
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
