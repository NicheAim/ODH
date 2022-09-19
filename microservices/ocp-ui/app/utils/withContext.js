import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from 'material-ui';
import LanguageProvider from '../containers/LanguageProvider';
import { history, store } from '../context';
import { translationMessages } from '../i18n';

export default function withContext(Component, extraProps = {}) {
  function WithContext(props) {
    const mergedProps = {
      ...props || {},
      ...extraProps
    };
    return (
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider>
              <Component {...mergedProps} />
            </MuiThemeProvider>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    );
  }

  const wrappedComponentName = Component.displayName
    || Component.name
    || 'Component';
  WithContext.displayName = `withContext(${wrappedComponentName})`;

  return (<WithContext />);
}
