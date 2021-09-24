import { ApolloClient } from '@apollo/client';

import { cache } from './cache';

export async function createClient() {
  return new ApolloClient({
    uri: 'https://crwn-clothing.com/',
    cache,
  });
}
