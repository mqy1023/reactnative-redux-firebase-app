import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Platform, Image, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Carousel from '../../components/Carousel';
import { toastShort } from '../../utils/toastUtil';

const { width, height } = Dimensions.get('window');

class MineMainPage extends Component {

  getParallaxRenderConfig() {
    const config = {};
    config.renderBackground = () => (
      <View key="background">
        <Image source={require('../../imgs/bg_arsenal.png')} style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }} />
        <View style={{ position: 'absolute', top: 0, width: window.width, backgroundColor: 'rgba(0,0,0,.3)', height: PARALLAX_HEADER_HEIGHT }} />
      </View>
    );
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={require('../../imgs/ic_avatar.png')} />
        <Text style={styles.sectionSpeakerText}>
          {'Pride of Gooners'}
        </Text>
        <Text style={styles.sectionTitleText}>
          {'Once A Gooner, Always A Gooner!'}
        </Text>
      </View>
    );
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{'Arsenal'}</Text>
      </View>
    );
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        <Image
          source={require('../../imgs/ic_share.png')}
          style={[{ opacity: .9, width: 18, height: 18, marginRight: 10, tintColor: 'white', resizeMode: 'stretch' }]}
        />
      </View>
    );
    return config;
  }

  render() {
    const renderConfig = this.getParallaxRenderConfig();
    return (
      <ParallaxScrollView
        contentBackgroundColor="#FFF"
        backgroundColor="#007aff"
        headerBackgroundColor="red"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundSpeed={10}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        {...renderConfig}
      >
        <View style={styles.container}>
          <Text>Scroll Me!</Text>
        </View>
      </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? 64 : 44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    alignItems: 'center',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fixedSectionText: {
    color: 'white',
    fontSize: 20,
    opacity: .9,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 5,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default MineMainPage;
