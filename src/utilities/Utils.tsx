import {
  AsyncStorage,
  UIManager,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import moment from 'moment';
import { UserCredentialRequest } from '../services/model/User';
export const _saveStorage = async (KEY: any, value: any) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(value));
  } catch (error) {
    return '';
  }
};

// ---------------------------------------------------------------- NORIFICATION
export const _getStorage = async (KEY: any) => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    if (value) {
      return JSON.parse(value);
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
};

export const storeCredential = async (action: UserCredentialRequest) => {
  try {
    await Keychain.setGenericPassword(
      JSON.stringify({
        username: action.username,
        fullName: action.fullName,
      }),
      action.password,
    );
  } catch (error) {
    return JSON.stringify(error);
  }
};

export const getCredential = async () => {
  try {
    // Retreive the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials;
    } else {
      return false;
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    return false;
  }
};

export const resetCredential = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    return JSON.stringify(error);
  }
};


export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    var navigatorOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      distanceFilter: 1,
    };
    navigator.geolocation.getCurrentPosition(
      // eslint-disable-line
      (position) => {
        let item = {
          type: 'Point',
          coordinates: [position.coords.longitude, position.coords.latitude],
        };
        resolve(item);
      },
      (error) => reject(error),
      navigatorOptions,
    );
  });
};

// Format price with point as thousands separators
export const formatPrice = (x = 0, character = '.') => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, character);
};

// Format price when fill text input
export const formatInputPrice = (x = '', character = '.') => {
  let value = x.replace(/\,/g, '');
  value = value.replace(/\./g, '');
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, character);
};

export const formatPriceString = (value: number) => {
  var suffixes = ['', 'K', 'M', 'B', 'T'];
  var suffixNum = Math.floor(('' + value).length / 3);
  var shortValue: any = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2),
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
};

// Replace line break
export const replaceLineBreakInEnd = (content = '') => {
  return content.replace(/^[\s\n]+|[\s\n]+$/, '');
};

// Regular expression
export const matchToNumber = () => {
  return /^\d+$/;
};

export const matchToVNPhoneNumb = (phone: string) => {
  return (
    phone.substr(0, 1).replace('0', '+84') +
    ' ' +
    phone.substr(1, 3) +
    ' ' +
    phone.substr(4, 2) +
    ' ' +
    phone.substr(6, 2) +
    ' ' +
    phone.substr(8, 2)
  );
};

export const matchAllChar = () => {
  return /./g;
};

export const matchDD_MM_YY = () => {
  return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[/](19|20)\d\d$/g;
};

export const matchAllSpecialCharacters = () => {
  return /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\ \!\@\#\{\}\=\`\~\%\^\&\>\<\:\;\'\"]/;
};

export const matchNumberAndChars = () => {
  return /^[A-Za-z0-9]*$/;
};

export const matchLicensePlate = () => {
  return /^[A-Za-z0-9--]*$/;
};
export const change1MinuteTo60Seconds = (second: number) => {
  return second % 60;
};

export function removeDuplicateCharacters(string: string) {
  return string
    .split('')
    .filter(function (item: any, pos: any, self: any) {
      return self.indexOf(item) == pos;
    })
    .join('');
}

export const getUniqueValue = (data: Array<any>) => {
  return data.filter(
    (val: any, id: any, array: any) => array.indexOf(val) == id,
  );
};

export function easeInEaseOutAnimation() {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export function setSpringAnimation() {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
}

export function updateStateData(data: any, idx: number) {
  return data.map((item: any, index: number) => {
    if (index !== idx) {
      return item;
    }
    return { ...item, selected: false };
  });
}

export default function validateEmail(email: String) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function validateTempEmail(email: String) {
  const re = /^(([\d+$]*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const changeDateToMillisecond = (day: number) => {
  return day * 86400000;
};

export const onValidatePassportNumber = (number: any) => {
  const regex = /^[A-Z][0-9]{7}$/;
  return regex.test(String(number));
};
export const onValidatePassword = (text: any) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(String(text));
};
const { width, height } = Dimensions.get('window');
// const designWidth = 360;
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const Scale = (size: any) => (width / guidelineBaseWidth) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (Scale(size) - size) * factor;
