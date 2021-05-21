import { Dimensions, Platform } from 'react-native';
import iPhoneXHelper from './iPhoneXHelper';

const { width, height } = Dimensions.get('window');
const screenRatio = width / height;

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: width,
  screenHeight: height,
  screenRatio,
  margin: {
    very_huge: 25,
    huge: 20,
    regular: 10,
    large: 15,
    small: 5,
    tiny: 2,
  },
  icon: {
    small: 12,
    normal: 16,
    regular: 18,
    large: 24,
  },
  borderRadius: {
    h5: 45,
    h6: 40,
    huge: 30,
    large: 15,
    regular: 10,
    medium: 7.5,
    small: 5,
    tiny: 2,
  },
  divider: 0.5,
  navHeight: Platform.OS ? 64 : 56,
  statusBarHeight: iPhoneXHelper.isIPhoneX() ? 44 : 22,
  btnHeight: 50,
};

export default metrics;
