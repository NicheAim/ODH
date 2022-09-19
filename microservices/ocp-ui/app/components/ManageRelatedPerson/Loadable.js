/**
 *
 * Asynchronously loads the component for ManageRelatedPerson
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
