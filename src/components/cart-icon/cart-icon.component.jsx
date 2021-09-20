import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';
import { selectCartItemCount } from '../../redux/cart/cart.selector';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const itemCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch();

  return (
    <div className="cart-icon" onClick={() => dispatch(toggleCartDropdown())}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
