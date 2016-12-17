import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Carousel extends Component {
  state: {
    offset: ?Number
  }

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    }
  }

  renderBubbles = (width: Number) => {
    const {
      children,
      color = '#007aff',
      dimmedColor = '#d5d5d5',
      bubbleWidth = 8,
      bubbleHeight = 8
    } = this.props;

    let bubbles = [];

    const emptyBubble = {
      width: bubbleWidth,
      height: bubbleHeight,
      backgroundColor: dimmedColor,
      borderRadius: 15,
      alignSelf: 'center',
    }

    const filledBubble = {
      width: bubbleWidth,
      height: bubbleHeight,
      backgroundColor: color,
      borderRadius: 15,
      alignSelf: 'center',
    }

    for (var i=0; i<children.length; i++) {
      bubbles.push (
          <View style={[emptyBubble, (i !== 0) ? { marginLeft: 10 } : {}] } key={ width * i }/>
      )
    }

    if (this.state.offset % width === 0) {
      bubbles.map((v, i) => {
        v.key == this.state.offset
          ? bubbles[v.key / width]
            = <View style={[filledBubble, (i !== 0) ? { marginLeft: 10 } : {} ]} key={ v.key }/>
          : null;
      })
    }

    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        { bubbles }
      </View>
    )
  }

  render() {
    const {
      backgroundColor = '#fff',
      children,
      showBubbles = true,
      showScroll = false,
    } = this.props;

    let pages = [];

    for (var i=0; i<children.length; i++) {
      pages.push (
        <View style={{ width: width }} key={ i }>
        { children[i] }
        </View>
      )
    }

    return (
      <View style={{ width: width, backgroundColor: '#fff', paddingVertical: 20, marginVertical: 15 }}>
        <ScrollView
            horizontal={ true }
            pagingEnabled={ true }
            showsHorizontalScrollIndicator={ showScroll }
            onScroll={ (e)=>{
                this.setState({offset: e.nativeEvent.contentOffset.x})
            }}
            style={{ width: width }}>
            { pages }
        </ScrollView>
        { showBubbles ? this.renderBubbles(width) : null }
      </View>
    )
  }
}
