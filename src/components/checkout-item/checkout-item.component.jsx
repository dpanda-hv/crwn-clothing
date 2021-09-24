import React from 'react';
import {
  addCartItem,
  removeCartItem,
  clearCartItem,
} from '../../graphql/mutations/cart';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <div className="name">{name}</div>
      <div className="price">${price}</div>
      <div className="quantity">
        <span className="arrow" onClick={() => removeCartItem(cartItem)}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addCartItem(cartItem)}>
          &#10095;
        </span>
      </div>
      <div className="remove-button" onClick={() => clearCartItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
