/**
 *
 * Asynchronously loads the component for CareTeamTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
