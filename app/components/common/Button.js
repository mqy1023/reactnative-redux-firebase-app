import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SpinnerLoading } from './SpinnerLoading';

const Button = ({ onPress, children, isFillBackGround, disabled, isLoading, style }) => {
  const { buttonStyle, textStyle } = styles;
  const textColor = isFillBackGround ? { color: '#fff' } : { color: '#007aff' };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[buttonStyle, style,
        isFillBackGround ? { backgroundColor: '#007aff' } : {},
        disabled ? { backgroundColor: '#ccc', borderColor: '#ccc' } : {}]}
    >
      {
        isLoading ? (
          <SpinnerLoading size="small" color="#fff" />
        ) : (
          <Text style={[textStyle, textColor, disabled ? { color: '#666' } : {}]}>{children}</Text>
        )
      }
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    backfaceVisibility: 'hidden',
  },
  buttonStyle: {
    // flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
};

export { Button };
