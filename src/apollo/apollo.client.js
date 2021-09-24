import { ApolloClient } from '@apollo/client';

import { cache } from './apollo.cache';

export async function createClient() {
  return new ApolloClient({
    uri: '/graphql',
    cache,
  });
}
