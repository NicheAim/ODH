/**
 *
 * Asynchronously loads the component for SearchRecipient
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
