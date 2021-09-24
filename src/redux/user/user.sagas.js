import { takeLatest, all, call, put } from '@redux-saga/core/effects';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
} from './user.actions';
import { clearCart } from '../../graphql/mutations/cart';

const {
  auth,
  createUserProfileDocument,
  getCurrentUser,
  signInWithGoogle: signInWithGoogleProvider,
} = require('../../firebase');

// Sign-in user with user auth data
function* signInWithUserAuth(userAuth, additionalData) {
  const userSnapshot = yield call(
    createUserProfileDocument,
    userAuth,
    additionalData
  );
  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
}

function* signInWithGoogle() {
  try {
    const { user } = yield signInWithGoogleProvider();
    yield signInWithUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield signInWithUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield signInWithUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    clearCart();
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
  try {
    yield signInWithUserAuth(user, additionalData);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
