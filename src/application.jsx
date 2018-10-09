import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { Navigation } from './navigation';
import { configureStore } from './redux/store';
import { rootSaga } from './redux/sagas';

import { globalStyles } from './theme/global';
import { theme } from './theme/theme';

export const store = configureStore();

/* eslint-disable */
injectGlobal`${globalStyles}`;
/* eslint-disable */

store.store.runSaga(rootSaga);

export const Application = hot(module)(() => (
  <Provider store={store.store}>
    <ThemeProvider theme={theme}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Navigation />
      </PersistGate>
    </ThemeProvider>
  </Provider>
));
