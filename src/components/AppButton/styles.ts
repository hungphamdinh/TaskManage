import { StyleSheet } from 'react-native';
import { Colors, Styles, Metrics } from '../../themes';

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: Metrics.borderRadius.regular,
    backgroundColor: Colors.appGreen,
    ...Styles.center,
  },
});

export default styles;
