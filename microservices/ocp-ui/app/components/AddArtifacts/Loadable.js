/**
 *
 * Asynchronously loads the component for AddArtifacts
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
