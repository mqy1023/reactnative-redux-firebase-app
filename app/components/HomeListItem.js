import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

const HomeListItem = ({ data, onPress }) => {
  const { listItem, detail, icon } = styles;

  return (
    <TouchableOpacity
      style={listItem}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={detail}>{`name: ${data.name}`}</Text>
      <Text style={[detail, { flex: 1.8 }]}>{`phone: ${data.phone}`}</Text>
      <Text style={detail}>{data.day}</Text>
      <Image source={require('../imgs/ic_arrow_right.png')} style={icon} />
    </TouchableOpacity>
  );
};

const styles = {
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
  detail: {
    flex: 1
  },
  icon: {
    width: 8,
    resizeMode: 'contain'
  }
};

export default HomeListItem;
