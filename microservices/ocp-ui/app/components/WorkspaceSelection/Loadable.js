/**
 *
 * Asynchronously loads the component for WorkspaceSelection
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
