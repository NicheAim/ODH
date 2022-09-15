/**
 *
 * Asynchronously loads the component for RadioButtonGroup
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
