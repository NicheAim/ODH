/**
 *
 * Asynchronously loads the component for SmartAppsGallery
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
