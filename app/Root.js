import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import App from './App';

class Root extends Component {

  componentWillMount() {
    // 配置参数在'u app' -> 'Authentication' -> 'General Use(网页应用)'
    const config = {
      apiKey: 'AIzaSyBrbkauX2P7DSGuPw6QWu8f9XuDen2NA6I',
      authDomain: 'leizhoupump.firebaseapp.com',
      databaseURL: 'https://leizhoupump.firebaseio.com',
      storageBucket: 'leizhoupump.appspot.com',
      messagingSenderId: '804534923225'
    };

    const firebaseApp = firebase.initializeApp(config);
    console.log('firebaseApp', firebaseApp.database().ref());
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
