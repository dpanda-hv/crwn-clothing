import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_CART_ITEMS } from '../../graphql/queries/cart';
import { getCartTotal } from '../../graphql/mutations/cart';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import StripeButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { data } = useQuery(GET_CART_ITEMS);
  const total = getCartTotal();

  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {data.cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>TOTAL: ${total}</span>
      </div>
      <StripeButton price={total} />
    </div>
  );
};

export default Checkout;
