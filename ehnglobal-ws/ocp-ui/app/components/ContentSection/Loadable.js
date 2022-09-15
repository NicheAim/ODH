/**
 *
 * Asynchronously loads the component for ContentSection
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
