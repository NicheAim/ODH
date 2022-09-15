/**
 *
 * Asynchronously loads the component for TimePicker
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
