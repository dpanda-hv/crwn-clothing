import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/client';

import { store } from './redux/store';
import { createClient } from './graphql/client';

import './index.css';
import App from './App';

createClient().then((client) => {
  ReactDOM.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
