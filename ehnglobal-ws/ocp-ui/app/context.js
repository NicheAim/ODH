/**
 * context.js
 *
 * Initializes and exports context properties.
 */

import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
export const history = createHistory();
export const store = configureStore(initialState, history);
