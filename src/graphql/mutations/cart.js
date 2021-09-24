import { makeVar } from '@apollo/client';
import makeVarPersisted from '../../apollo/makeVarPersisted';

import {
  _addItemToCart,
  _removeItemFromCart,
  _clearItemFromCart,
  _getCartItemsCount,
  _getCartItemsTotal,
} from './_utils';

export const isCartHiddenVar = makeVar(true);
export const cartItemsVar = makeVarPersisted([], 'cartItemsVar');

export const addCartItem = (itemToAdd) => {
  const items = cartItemsVar();
  cartItemsVar(_addItemToCart(items, itemToAdd));
  cartCountVar(getCartCount());
};

export const removeCartItem = (itemToRemove) => {
  const items = cartItemsVar();
  cartItemsVar(_removeItemFromCart(items, itemToRemove));
  cartCountVar(getCartCount());
};

export const clearCartItem = (itemToClear) => {
  const items = cartItemsVar();
  cartItemsVar(_clearItemFromCart(items, itemToClear));
  cartCountVar(getCartCount());
};

export const clearCart = () => {
  cartItemsVar([]);
  cartCountVar(0);
};

export const getCartCount = () => {
  const items = cartItemsVar();
  return _getCartItemsCount(items);
};

export const getCartTotal = () => {
  const items = cartItemsVar();
  return _getCartItemsTotal(items);
};

export const isCartHidden = () => isCartHiddenVar();

export const hideCart = () => {
  isCartHiddenVar(true);
};

export const showCart = () => {
  isCartHiddenVar(false);
};

export const toggleCart = () => {
  const hidden = isCartHidden();
  hidden ? showCart() : hideCart();
};

export const cartCountVar = makeVar(getCartCount());
