/**
 *
 * Asynchronously loads the component for FormSubtitle
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
