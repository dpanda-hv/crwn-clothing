import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectCartItems } from '../../redux/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';

import {
  CartDropdownContainer,
  CartItemsContainer,
  CustomButtonContainer,
  EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <CartDropdownContainer>
      {cartItems.length ? (
        <CartItemsContainer>
          {cartItems.map((cartItem) => (
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
            dispatch(toggleCartDropdown());
          }}
        >
          GO TO CHECKOUT
        </CustomButton>
      </CustomButtonContainer>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
