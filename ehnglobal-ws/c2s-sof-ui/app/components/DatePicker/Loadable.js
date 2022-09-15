/**
 *
 * Asynchronously loads the component for DatePicker
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
