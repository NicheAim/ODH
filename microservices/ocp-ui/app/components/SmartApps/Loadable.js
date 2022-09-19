/**
 *
 * Asynchronously loads the component for SmartApps
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
