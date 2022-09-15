/**
 *
 * Asynchronously loads the component for ToDoAccordion
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
