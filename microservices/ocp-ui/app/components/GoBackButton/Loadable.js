/**
 *
 * Asynchronously loads the component for GoBackButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
