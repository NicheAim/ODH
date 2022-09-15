/**
 *
 * Asynchronously loads the component for RelatedPersonTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
