/**
 *
 * Asynchronously loads the component for UpcomingTasksTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
