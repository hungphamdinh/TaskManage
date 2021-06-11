import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../themes';
import { androidOS } from '../../helpers/Constants';

const styles = StyleSheet.create({
  textInput: {
    fontSize: Fonts.size.large,
  },
  textTextInput: {
    color: Colors.appGrayColor,
    marginBottom: Metrics.margin.small,
  },
  textValidate: {
    color: Colors.appColor,
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: Metrics.borderRadius.large,
    backgroundColor: Colors.appWhite,
    marginTop: Metrics.margin.tiny,
  },
  dropdown: {
    backgroundColor: Colors.appWhite,
    padding: Metrics.margin.regular,
    marginTop: Metrics.margin.regular,
    position: 'absolute',
    right: 30,
    top: 70,
    zIndex: 2,
  },
  buttonSetting: {
    marginRight: Metrics.margin.small,
    width: 10,
  },
});

export default styles;
