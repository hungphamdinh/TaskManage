import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;

export const isIPhoneX = () => {
  return Platform.OS === 'ios' && isIPhoneXSize() && !isIpad();
};

export const isIPhoneXSize = () => {
  return height > 800 || width > 800;
};

export const isIpad = () => {
  return aspectRatio < 1.6;
};

export const isPhone4And5 = () => {
  return Platform.OS === 'ios' && width < 375;
};

export default { isIPhoneX, isIPhoneXSize };
