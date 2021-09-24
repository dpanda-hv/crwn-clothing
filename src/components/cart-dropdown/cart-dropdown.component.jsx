import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { GET_CART_ITEMS } from '../../graphql/queries/cart';
import { hideCart } from '../../graphql/mutations/cart';
import {
  CartDropdownContainer,
  CartItemsContainer,
  CustomButtonContainer,
  EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const history = useHistory();
  const { data } = useQuery(GET_CART_ITEMS);

  return (
    <CartDropdownContainer>
      {data.cartItems.length ? (
        <CartItemsContainer>
          {data.cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))}
        </CartItemsContainer>
      ) : (
        <EmptyMessage>Your cart is empty!</EmptyMessage>
      )}
      <CustomButtonContainer>
        <CustomButton
          onClick={() => {
            history.push('/checkout');
            hideCart();
          }}
        >
          GO TO CHECKOUT
        </CustomButton>
      </CustomButtonContainer>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
