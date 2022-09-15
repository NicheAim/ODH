/**
 *
 * Asynchronously loads the component for SearchBar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
