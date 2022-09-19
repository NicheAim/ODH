/**
 *
 * Asynchronously loads the component for ManageCommunicationPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
