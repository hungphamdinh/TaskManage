import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../../../../themes';

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: Metrics.margin.large,
    marginTop: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.regular,
  },
  body: {

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.h5,
  },
  textName: {
  },
  profileContainer: {
    flexDirection: 'row',
  },
  textRole: {
    marginTop: Metrics.margin.tiny,
  },
  textContent: {
    marginTop: Metrics.margin.large,
  },
  contentContainer: {
    marginLeft: Metrics.margin.regular,
  }
});

export default styles;
