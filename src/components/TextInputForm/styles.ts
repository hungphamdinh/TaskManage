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
});

export default styles;
