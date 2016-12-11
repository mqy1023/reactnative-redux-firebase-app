// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';

const isIos = (Platform.OS === 'ios');
/* eslint global-require: "off"*/

const HeaderNavBar = (props) => {
  const { container, titleStyle, iconStyle } = styles;

  // 右边图标按钮

  const headContent = [];
  // 左边菜单
  headContent.push(
    <TouchableOpacity
      key={'leftContent'}
      activeOpacity={0.85}
      style={{ width: 100 }}
      onPress={props.leftIconAction}
    >
      {
        (props.leftIcon !== undefined) ?
          <Image style={iconStyle} source={require('../../imgs/ic_arrow_left.png')} /> : null
      }
    </TouchableOpacity>
  );

  // 中间标题
  if (props.title !== undefined) {
    headContent.push(
      <Text key={'title'} style={titleStyle}>{props.title}</Text>
    );
  }

  // 右边菜单
  headContent.push(
    <TouchableOpacity
      key={'rightContent'}
      activeOpacity={0.85}
      style={{ width: 100, alignItems: 'flex-end' }}
      onPress={props.rightIconAction}
    >
      {
        (props.rightIcon === 'all') ? <Image style={iconStyle} source={require('../../imgs/ic_arrow_left.png')} /> : null
      }
      {
        (props.rightIcon === 'set') ? <Image style={iconStyle} source={require('../../imgs/ic_arrow_left.png')} /> : null
      }
      {
        (props.rightIcon === 'plus') ? <Image style={iconStyle} source={require('../../imgs/ic_plus.png')} /> : null
      }
    </TouchableOpacity>
  );

  return (
    <View style={[container, isIos ? { paddingTop: 20 } : { paddingTop: 0 }]}>
      { headContent }
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#007aff',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    elevation: 4,
    position: 'relative',
    paddingHorizontal: 10
  },
  iconStyle: {
    height: 18,
    width: 18
  },
  titleStyle: {
    fontSize: 20,
    color: 'white'
  }
};

// Make the component available to other parts of the app
export { HeaderNavBar };
