/**
 *
 * Asynchronously loads the component for FileInputComponentField
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
