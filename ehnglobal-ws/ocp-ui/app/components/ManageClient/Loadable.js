/**
 *
 * Asynchronously loads the component for ManageClient
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
