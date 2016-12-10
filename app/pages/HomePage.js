import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import { HeaderNavBar } from '../components/common';

class HomePage extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   dataSource: new ListView.DataSource({
    //     rowHasChanged: (row1, row2) => row1 !== row2,
    //   })
    // };
    // this.itemsRef = this.getRef().child('items');
  }

  render() {
    // const { currentUser } = firebase.auth();
    return (
      <View style={styles.container}>
        <HeaderNavBar title={'首页'} rightIcon={'plus'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>恭喜您登录成功!</Text>
          <Text>{this.props.uid || ''}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    uid: state.currentUID
  };
};

export default connect(mapStateToProps)(HomePage);
