import { gql } from '@apollo/client';

export const GET_CART_HIDDEN = gql`
  query GetCartHidden {
    isCartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const GET_CART_COUNT = gql`
  query GetCartCount {
    cartCount @client
  }
`;
