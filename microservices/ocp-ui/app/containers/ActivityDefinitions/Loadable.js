/**
 *
 * Asynchronously loads the component for ActivityDefinitions
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
