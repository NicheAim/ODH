/**
 *
 * Asynchronously loads the component for PatientWorkspacePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
