import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../../../themes';

const styles = StyleSheet.create({
  itemContainer: {
    // padding: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.medium,
    marginTop: Metrics.margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    // marginLeft: Metrics.margin.regular,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  marginTopSmall: {
    marginTop: Metrics.margin.tiny,
  },
  buttonContainer: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonAccept: {
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
  },
  buttonCancel: {
    paddingHorizontal: Metrics.margin.regular,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'red',
    borderTopRightRadius: Metrics.borderRadius.regular,
    borderBottomRightRadius: Metrics.borderRadius.regular,
  },
  infoContainer: {
    flex: 0.65,
    paddingVertical: Metrics.margin.regular,
    paddingLeft: Metrics.margin.regular,
  },
});

export default styles;
