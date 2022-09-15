/**
 *
 * Asynchronously loads the component for CustomErrorText
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
