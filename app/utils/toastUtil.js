import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';

let toast;

export const toastShort = (content) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: Platform.OS === 'android' ? Toast.positions.BOTTOM : Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 300
  });
};

export const toastLong = (content) => {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.LONG,
    position: Platform.OS === 'android' ? Toast.positions.BOTTOM : Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
};
