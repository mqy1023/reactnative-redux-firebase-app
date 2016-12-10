import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { CardContainer, CardItem, InputItem, Button, HeaderNavBar } from '../../components/common';
import RegisterPage from './RegisterPage';
import HomePage from '../HomePage';
import { setCurrentUID } from '../../actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ isLoading: false });
        this.props.setCurrentUID(user.uid);
        this.props.navigator.replace({ component: HomePage });
      })
      .catch(err => {
        console.log('err', err);
        this.setState({ isLoading: false });
        Alert.alert('', '登录失败, 请重新输入邮箱和密码!', [
          { text: '确认', onPress: () => {} },
        ]);
      });
  }

  render() {
    const isLoginBtnDisable = !(this.state.email !== '') || !(this.state.password !== '');
    return (
      <View style={styles.container}>
        <HeaderNavBar title={'登录'} />
        <CardContainer>
          <CardItem>
            <InputItem
              label="用户名"
              placeholder="email@gmail.com"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </CardItem>

          <CardItem>
            <InputItem
              secureTextEntry
              label="密码"
              placeholder="password"
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </CardItem>
        </CardContainer>
        <View style={styles.buttonWrap}>
          <Button
            onPress={this.handleLogin}
            isFillBackGround
            isLoading={this.state.isLoading}
            style={{ marginVertical: 20 }}
            disabled={isLoginBtnDisable || this.state.isLoading}
          >
            登录
          </Button>
          <Button onPress={() => { this.props.navigator.push({ component: RegisterPage }); }}>
            去注册
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrap: {
    marginHorizontal: 10
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUID: (uid) => dispatch(setCurrentUID(uid)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
