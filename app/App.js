import React from 'react';
import { Navigator, View, StatusBar } from 'react-native';
import LoginPage from './pages/login/LoginPage';

class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#007aff"
          barStyle="light-content"
        />
        <Navigator
          style={{ flex: 1 }}
          initialRoute={{ name: 'LoginPage', component: LoginPage }}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            const Component = route.component;
            return (
              <Component navigator={navigator} route={route} {...route.passProps} />
            );
          }}
        />
      </View>
    );
  }
}

export default App;
