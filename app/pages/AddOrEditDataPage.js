import React, { Component } from 'react';
import { View, Alert, Picker } from 'react-native';
import firebase from 'firebase';
import { CardContainer, CardItem, InputItem, Button, HeaderNavBar } from '../components/common';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default class AddOrEditDataPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      day: 'Thursday',
      isLoading1: false,
      isLoading2: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBackNav = this.handleBackNav.bind(this);
  }

  componentDidMount() {
    this.db = firebase.database();
    const { item } = this.props;
    if (item) { // 更改联系人
      this.setState({ name: item.name, phone: item.phone, day: item.day });
    }
  }

  handleBackNav() {
    const { name, phone } = this.state;
    if (name !== '' || phone !== '') {
      Alert.alert('', '确定放弃编辑?', [
        { text: '取消', onPress: () => {} },
        { text: '确认', onPress: () => { this.props.navigator.pop(); } },
      ]);
    } else {
      this.props.navigator.pop();
    }
  }

  handleSave() {
    const { name, phone, day } = this.state;
    this.setState({ isLoading1: true });
    this.db.ref(`/users/${this.props.uid}/contacts/${name}`).set({ name, phone, day }).then(() => {
      this.setState({ isLoading1: false, name: '', phone: '' });
      this.props.navigator.pop();
    });
  }

  handleDelete() {
    const { name } = this.state;
    this.setState({ isLoading2: true });
    this.db.ref(`/users/${this.props.uid}/contacts/${name}`).remove().then(() => {
      this.setState({ isLoading2: false });
      this.props.navigator.pop();
    });
  }

  render() {
    const isCreateBtnDisable = !(this.state.name !== '') || !(this.state.phone !== '');
    const { item } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HeaderNavBar
          title={item ? '更改联系人' : '新建联系人'}
          leftIcon
          leftIconAction={this.handleBackNav}
        />
        <CardContainer>
          <CardItem>
            <InputItem
              label="姓名"
              placeholder="name"
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
          </CardItem>
          <CardItem>
            <InputItem
              label="手机号"
              placeholder="phone"
              // keyboardType="numeric"
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
          </CardItem>
          <CardItem>
            <Picker
              style={{ flex: 1 }}
              selectedValue={this.state.day}
              onValueChange={text => this.setState({ day: text })}
            >
              {
                WEEKDAYS.map((itemDay, index) => {
                  return (
                    <Picker.Item key={`picker${index}`} label={itemDay} value={itemDay} />
                  );
                })
              }
            </Picker>
          </CardItem>
        </CardContainer>
        <Button
          onPress={this.handleSave}
          isFillBackGround
          isLoading={this.state.isLoading1}
          style={{ marginVertical: 20, marginHorizontal: 10 }}
          disabled={isCreateBtnDisable || this.state.isLoading1 || this.state.isLoading2}
        >
          保存联系人
        </Button>
        {
          item ? (
            <Button
              onPress={this.handleDelete}
              isLoading={this.state.isLoading2}
              style={{ marginHorizontal: 10 }}
              disabled={this.state.isLoading1 || this.state.isLoading2}
            >
              删除联系人
            </Button>
          ) : null
        }
      </View>
    );
  }
}
