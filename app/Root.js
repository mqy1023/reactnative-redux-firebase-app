import React, { Component } from 'react';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
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

  componentDidMount() {
    codePush.sync({
      deploymentKey: 'RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul',
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: '新版本了, 是否更新？',
        title: '更新提示'
      },
      installMode: codePush.InstallMode.ON_NEXT_RESTART
    });
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
