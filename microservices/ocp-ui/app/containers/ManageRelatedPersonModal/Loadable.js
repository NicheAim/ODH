/**
 *
 * Asynchronously loads the component for ManageRelatedPersonModal
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
