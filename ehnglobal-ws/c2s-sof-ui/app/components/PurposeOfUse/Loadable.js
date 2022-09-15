/**
 *
 * Asynchronously loads the component for PurposeOfUse
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
