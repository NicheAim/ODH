/**
 *
 * Asynchronously loads the component for CommunicationsTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
