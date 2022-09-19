/**
 *
 * Asynchronously loads the component for CommunicationsTableDialog
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
