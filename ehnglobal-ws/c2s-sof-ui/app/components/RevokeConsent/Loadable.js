/**
 *
 * Asynchronously loads the component for RevokeConsent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
