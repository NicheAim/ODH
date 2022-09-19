/**
 *
 * Asynchronously loads the component for ManageCareTeamPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
