/**
 *
 * Asynchronously loads the component for WorkspaceSelectionPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
