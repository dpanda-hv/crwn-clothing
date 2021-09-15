import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import Shop from './pages/shop/shop.component';
import SignInSignUp from './pages/signin-signup/signin-signup.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import Checkout from './pages/checkout/checkout.component';

class App extends React.Component {
  subscriptions = {};

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.subscriptions['onAuthStateChanged'] = auth.onAuthStateChanged(
      async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          this.subscriptions['onSnapshot'] = onSnapshot(userRef, (snapShot) => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            });
          });
        } else {
          setCurrentUser(userAuth);
        }
      }
    );
  }

  componentWillUnmount() {
    for (const unsubscribe of Object.values(this.subscriptions)) {
      unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/checkout" component={Checkout} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
