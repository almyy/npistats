import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { BrowserRouter, Route} from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: '/graphql'})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </ApolloProvider>,
     document.getElementById('root'));
registerServiceWorker();
