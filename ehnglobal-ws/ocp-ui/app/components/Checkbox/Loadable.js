/**
 *
 * Asynchronously loads the component for Checkbox
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
