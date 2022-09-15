/**
 *
 * Asynchronously loads the component for SmartContextInitializerPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
