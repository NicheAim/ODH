/**
 *
 * Asynchronously loads the component for OrganizationTable
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
