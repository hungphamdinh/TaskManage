import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../../../themes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    flexGrow: 1,
    backgroundColor: Colors.appWhite,
    borderRadius: (Metrics.borderRadius.large),
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  btnClose: {
    alignSelf: 'flex-end',
    marginRight: Metrics.margin.small,
    marginTop: Metrics.margin.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: (Metrics.margin.regular + 2),
    paddingHorizontal: (Metrics.margin.large),
    borderBottomColor: Colors.overlay1,
  },
  bottomPushUp: {
    paddingBottom: (Metrics.margin.huge),
  },
  mainContainer: {
    paddingHorizontal: Metrics.margin.large,
    marginTop: Metrics.margin.regular,
  },
  buttonAdd: {
    marginTop: Metrics.margin.huge,
  },
  itemContainer: {
    padding: Metrics.margin.regular,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.h6,
    marginRight: Metrics.margin.regular,
  }
});

export default styles;
