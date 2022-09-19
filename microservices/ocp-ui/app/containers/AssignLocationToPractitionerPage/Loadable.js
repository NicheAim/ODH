/**
 *
 * Asynchronously loads the component for AssignLocationToPractitionerPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
