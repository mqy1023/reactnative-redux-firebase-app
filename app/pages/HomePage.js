import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { HeaderNavBar } from '../components/common';
import AddOrEditDataPage from './AddOrEditDataPage';
import HomeListItem from '../components/HomeListItem';
import { toastShort } from '../utils/toastUtil';
import Carousel from '../components/githubs/LoopCarousel';

const { width, height } = Dimensions.get('window');

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const { uid } = this.props;
    // listen database change
    firebase.database().ref(`/users/${uid}/contacts`)
      .on('value', snapshot => {
        const items = [];
        console.log('snapshot', snapshot.val());
        snapshot.forEach((child) => {
          items.push(child.val());
          console.log('child', child.val());
        });
        console.log('items', items);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
      });
  }

  handleClickItem(item) {
    const { uid } = this.props;
    this.props.navigator.push({ component: AddOrEditDataPage, passProps: { uid, item } });
  }

  renderItem(item) {
    return (
      <HomeListItem
        data={item}
        onPress={this.handleClickItem.bind(this, item)}
      />
    );
  }

  renderSeparator(sectionID, rowID) { // 两行间的样式
    return (
      <View key={rowID} style={styles.separatorView} />
    );
  }

  renderContent() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        enableEmptySections
        style={styles.listview}
        renderSeparator={this.renderSeparator}
      />
    );
  }

  render() {
    // const { currentUser } = firebase.auth();
    const { uid } = this.props;
    return (
      <View style={styles.container}>
        <HeaderNavBar
          title={'首页'}
          rightIcon={'plus'}
          rightIconAction={() => this.props.navigator.push({ component: AddOrEditDataPage, passProps: { uid } })}
        />
        <Carousel
          delay={2000}
          style={{ width, height: width / 2 }}
          autoplay
          bullets
        >
          <Image source={require('../imgs/img_arsenal1.png')} style={{ width, height: width / 2 }} />
          <Image source={require('../imgs/img_arsenal2.png')} style={{ width, height: width / 2 }} />
          <Image source={require('../imgs/img_arsenal3.png')} style={{ width, height: width / 2 }} />
        </Carousel>
        {
          this.renderContent()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    marginBottom: 50
  },
  listview: {
    flex: 1
  },
  separatorView: {
    flex: 1,
    height: 10,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    uid: state.currentUID
  };
};

export default connect(mapStateToProps)(HomePage);
