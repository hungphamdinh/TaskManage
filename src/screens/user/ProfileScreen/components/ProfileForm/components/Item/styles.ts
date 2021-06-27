import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../../../../themes';

const styles = StyleSheet.create({
  itemContainer: {
    padding: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    marginTop: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.regular,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBox: {
    padding: Metrics.margin.small,
    borderRadius: Metrics.borderRadius.small,
    borderColor: Colors.overlay3,
    borderWidth: 1,
  },
  textName: {
    marginLeft: Metrics.margin.regular,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.h5,
    backgroundColor: Colors.appGrayColor,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonAdd: {
    backgroundColor: Colors.buttonIconColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: Metrics.borderRadius.medium,
  },
});

export default styles;
