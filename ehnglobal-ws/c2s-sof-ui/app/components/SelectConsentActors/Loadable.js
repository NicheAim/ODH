/**
 *
 * Asynchronously loads the component for SelectConsentActors
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
