import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Platform, Image, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Carousel from '../../components/Carousel';
import { CardContainer, CardItem, InputItem, Button, HeaderNavBar } from '../../components/common';
import { toastShort } from '../../utils/toastUtil';

const { width, height } = Dimensions.get('window');

class MallMainPage extends Component {

  constructor() {
    super();
    this.firstCarousel = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderNavBar title={'商场'} />
        <Carousel>
          <View style={styles.carouselPage}>
            {
              this.firstCarousel.map((item, index) => {
                return (
                  <TouchableHighlight
                    key={`carousel${index}`}
                    activeOpacity={0.8}
                    style={styles.carouselItem}
                    underlayColor="#D8D8D8"
                    onPress={() => { toastShort(`选项${item}`); }}
                  >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={require('../../imgs/ic_computer.png')} style={{ width: 60, height: 60 }} />
                      <Text>{item}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })
            }
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              Carousel Page 2
            </Text>
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA'
  },
  carouselPage: {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
  carouselItem: {
    width: width / 4,
    height: 80,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MallMainPage;
