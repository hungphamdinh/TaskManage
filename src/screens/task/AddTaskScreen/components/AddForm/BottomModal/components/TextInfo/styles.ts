import { StyleSheet } from 'react-native';
import { Scale } from '../../../../../../../../utilities/Utils';
import { Metrics } from '../../../../../../../../themes';

const styles = StyleSheet.create({
  textInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Scale(Metrics.margin.huge),
  },
  textContent: {
    maxWidth: Metrics.screenWidth / 2,
  },
  textContent2: {
    maxWidth: Metrics.screenWidth / 2,
  },
  content: { textAlign: 'right' },
});

export default styles;
