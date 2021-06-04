import { StyleSheet } from 'react-native';
import {Styles, Metrics} from '../../themes';

const styles = StyleSheet.create({
  container: {
    ...Styles.overlay,
    ...Styles.center,
  },
  indicatorContainer: {
    height: 55,
    width: 65,
    borderRadius: Metrics.borderRadius.small,
    justifyContent: 'center',
    ...Styles.center,
  },
});

export default styles;
