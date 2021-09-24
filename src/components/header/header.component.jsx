import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from './header.styles';
import { signOutStart } from '../../redux/user/user.actions';
import { GET_CART_HIDDEN } from '../../graphql/queries/cart';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data } = useQuery(GET_CART_HIDDEN);
  const dispatch = useDispatch();

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => dispatch(signOutStart())}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {data.isCartHidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

export default Header;
