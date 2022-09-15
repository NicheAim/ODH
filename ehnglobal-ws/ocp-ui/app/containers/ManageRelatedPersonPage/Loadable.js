/**
 *
 * Asynchronously loads the component for ManageRelatedPersonPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
