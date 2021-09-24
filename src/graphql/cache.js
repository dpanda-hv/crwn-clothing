import { InMemoryCache } from '@apollo/client';

import { isCartHiddenVar, cartItemsVar, cartCountVar } from './mutations/cart';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isCartHidden: {
          read() {
            return isCartHiddenVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        cartCount: {
          read() {
            return cartCountVar();
          },
        },
      },
    },
  },
});
