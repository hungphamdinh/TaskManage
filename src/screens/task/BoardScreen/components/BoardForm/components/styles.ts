import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../../../themes';

const styles = StyleSheet.create({
  itemContainer: {
    padding: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    marginTop: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.regular,
  },
  marginVertical: {
    marginTop: Metrics.margin.regular,
    marginBottom: Metrics.margin.large,
  },
  itemBody: {
    paddingHorizontal: Metrics.margin.regular,
    borderLeftWidth: 3,
  },
  taskName: {
    marginTop: -Metrics.margin.small +1,
  },
  textDescription: {
    marginTop: Metrics.margin.regular,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  timeContainer: {
    flexGrow: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberContainer: {
    flexGrow: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTime: {
    width: 18,
    height: 18,
  },
  textTime: {
    marginLeft: Metrics.margin.small + 2,
  },
  iconUser: {
    width: 18,
    height: 18,
  },
  listContainer: {flexGrow: 1},
  sideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default styles;
