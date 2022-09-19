/**
 *
 * Asynchronously loads the component for StatusCheckbox
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
