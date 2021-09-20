import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import {
  emailSignInStart,
  googleSignInStart,
} from '../../redux/user/user.actions';

import './signin.styles.scss';

const SignIn = () => {
  const [useCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = useCredentials;
    dispatch(emailSignInStart({ email, password }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({
      ...useCredentials,
      [name]: value,
    });
  };

  const { email, password } = useCredentials;

  return (
    <div className="sign-in">
      <h2>I already have an account.</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={() => dispatch(googleSignInStart())}
            isGoogleSignIn
          >
            Sign In with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
