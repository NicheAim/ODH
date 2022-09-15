/**
 *
 * Asynchronously loads the component for CareTeams
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
