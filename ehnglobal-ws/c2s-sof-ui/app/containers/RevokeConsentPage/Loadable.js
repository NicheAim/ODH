/**
 *
 * Asynchronously loads the component for RevokeConsentPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
