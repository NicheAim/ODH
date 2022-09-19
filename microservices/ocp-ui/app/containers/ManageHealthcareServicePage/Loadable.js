/**
 *
 * Asynchronously loads the component for ManageHealthcareServicePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
