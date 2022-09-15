/**
 *
 * Asynchronously loads the component for RecipientsTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
