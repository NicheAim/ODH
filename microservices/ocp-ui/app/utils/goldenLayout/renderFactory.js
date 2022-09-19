import ReactDOM from 'react-dom';
import withContext from '../../utils/withContext';

export default function renderFactory(Component, extraProps) {
  return function renderComponent(location) {
    ReactDOM.render(
      withContext(Component, extraProps),
      document.getElementById(location)
    );
  };
}
