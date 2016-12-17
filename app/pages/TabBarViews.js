import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './HomePage';
import MineMainPage from './mine/MineMainPage';
import MallMainPage from './mall/MallMainPage';

/* eslint global-require: "off"*/
export default class TabBarViews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '首页',
    };
  }

  renderTab(Component, title, icon) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === title}
        title={title}
        selectedTitleStyle={styles.selectedTitleStyle}
        renderIcon={() => (
          <Image
            style={styles.tabBarIcon}
            source={icon}
          />
        )}
        renderSelectedIcon={() => (
          <Image
            style={[styles.tabBarSelectedIcon, { tintColor: '#007aff' }]}
            source={icon}
          />
        )}
        onPress={() => this.setState({ selectedTab: title })}
      >
        <Component {...this.props} homeComponent={this} />
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator
          tabBarStyle={{ opacity: 1.2 }}
          sceneStyle={{ paddingBottom: 0 }}
        >
          {this.renderTab(HomePage, '首页', require('../imgs/ic_home.png'))}
          {this.renderTab(MallMainPage, '商场', require('../imgs/ic_community.png'))}
          {this.renderTab(MineMainPage, '我的', require('../imgs/ic_personal.png'))}
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  tabBarSelectedIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  selectedTitleStyle: {
    color: '#007aff'
  }
});
