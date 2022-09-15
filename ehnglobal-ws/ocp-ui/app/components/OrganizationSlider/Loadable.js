/**
 *
 * Asynchronously loads the component for OrganizationSlider
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
