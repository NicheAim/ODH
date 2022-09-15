/**
 *
 * Asynchronously loads the component for SelectField
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
