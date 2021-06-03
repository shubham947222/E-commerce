import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './components/pages/homepage/homepage.component';
import ShopPage from './components/pages/shop/shop.component';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument,userAuth} from './firebase/firebase.utils';   


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  } 

  unsubcribeFromAuth = null;
  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          console.log(snapShot);
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          
        })
      }
      else
      this.setState({currentUser: userAuth})
      });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render(){
    return (
        <div >
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/shop' component={ShopPage}/>
            <Route path='/signin' component={SignInAndSignUpPage}/>
          </Switch>
        </div>
      );
  }
  
}

export default App;
 