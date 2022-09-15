/**
 *
 * Asynchronously loads the component for AttestConsentPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
