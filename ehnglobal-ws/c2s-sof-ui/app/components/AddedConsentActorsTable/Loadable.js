/**
 *
 * Asynchronously loads the component for AddedConsentActorsTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
