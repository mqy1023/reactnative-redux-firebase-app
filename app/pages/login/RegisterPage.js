import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import firebase from 'firebase';
// import LeanCloudApp from 'leancloud-storage';
import { CardContainer, CardItem, InputItem, Button, HeaderNavBar } from '../../components/common';
import { toastShort } from '../../utils/toastUtil'

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      errorMsg: '',
      isLoading: false
    };
    this.hanldeSignUp = this.hanldeSignUp.bind(this);
  }

  hanldeSignUp() {
    const { email, password, passwordConfirm } = this.state;

    if (password.trim() !== passwordConfirm.trim()) {
      toastShort('两次输入密码不一致');
    } else {
      this.setState({ isLoading: true });
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.setState({ isLoading: false });
          Alert.alert('', '恭喜您注册成功!', [
            { text: '确认', onPress: () => this.props.navigator.pop() },
          ]);
        })
        .catch(err => {
          this.setState({ isLoading: false });
          Alert.alert('', '注册失败, 请重新输入!', [
            { text: '确认', onPress: () => {} },
          ]);
        });
    }
  }

  render() {
    const isLoginBtnDisable = !(this.state.email !== '') || !(this.state.password !== '');
    return (
      <View style={styles.container}>
        <HeaderNavBar
          title={'注册'}
          leftIcon
          leftIconAction={() => { this.props.navigator.pop(); }}
        />
        <CardContainer>
          <CardItem>
            <InputItem
              label="用户名"
              placeholder="email@gmail.com"
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </CardItem>

          <CardItem>
            <InputItem
              secureTextEntry
              label="密码"
              placeholder="password"
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </CardItem>
          <CardItem>
            <InputItem
              secureTextEntry
              label="确认密码"
              placeholder="password"
              value={this.state.passwordConfirm}
              onChangeText={(text) => this.setState({ passwordConfirm: text })}
            />
          </CardItem>
        </CardContainer>
        <View style={styles.buttonWrap}>
          <Button
            onPress={this.hanldeSignUp}
            isFillBackGround
            isLoading={this.state.isLoading}
            style={{ marginVertical: 20 }}
            disabled={isLoginBtnDisable || this.state.isLoading}
          >
            注册
          </Button>
          <Button onPress={() => { this.props.navigator.pop(); }}>
            去登录
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonWrap: {
    marginHorizontal: 10
  }
});

export default RegisterPage;
