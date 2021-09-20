import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';

import './signup.styles.scss';

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = userDetails;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    dispatch(signUpStart({ displayName, email, password }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const { displayName, email, password, confirmPassword } = userDetails;

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account.</h2>
      <span>Sign up with your email and password.</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          label="Display Name"
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
