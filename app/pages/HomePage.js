import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { HeaderNavBar } from '../components/common';
import AddOrEditDataPage from './AddOrEditDataPage';

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
      <TouchableOpacity
        style={styles.listItem}
        onPress={this.handleClickItem.bind(this, item)}
        activeOpacity={0.8}
      >
        <Text style={styles.item}>{`name: ${item.name}`}</Text>
        <Text style={[styles.item, { flex: 1.8 }]}>{`phone: ${item.phone}`}</Text>
        <Text style={styles.item}>{item.day}</Text>
        <Image source={require('../imgs/ic_arrow_right.png')} style={styles.icon} />
      </TouchableOpacity>
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
  },
  listview: {
    flex: 1
  },
  separatorView: {
    flex: 1,
    height: 10,
    // backgroundColor: '#EAEAEA',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  item: {
    flex: 1
  },
  icon: {
    width: 8,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    uid: state.currentUID
  };
};

export default connect(mapStateToProps)(HomePage);
