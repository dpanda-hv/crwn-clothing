import React from 'react';
import { useQuery } from '@apollo/client';

import { toggleCart } from '../../graphql/mutations/cart';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { GET_CART_COUNT } from '../../graphql/queries/cart';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { data } = useQuery(GET_CART_COUNT);

  return (
    <div className="cart-icon" onClick={() => toggleCart()}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{data.cartCount}</span>
    </div>
  );
};

export default CartIcon;
