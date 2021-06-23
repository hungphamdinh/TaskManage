import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../themes';

const styles = StyleSheet.create({
  itemContainer: {
    // padding: Metrics.margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.medium,
    marginTop: Metrics.margin.large,
  },
  mainContainer: {
    // marginLeft: Metrics.margin.regular,
    flexDirection: 'row',
    flex: 1,
  },
  marginTopSmall: {
    marginTop: Metrics.margin.tiny,
  },
  marginLeftSmall: {
    marginLeft: Metrics.margin.regular,
  },
  infoContainer: {
    paddingVertical: Metrics.margin.regular,
    paddingLeft: Metrics.margin.regular,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.margin.small,
  },
  status: {
    paddingVertical: Metrics.margin.small,
    marginLeft: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
    paddingTop: Metrics.margin.regular,
    marginBottom: Metrics.margin.regular,
  },
  verticalBar: {
    width: 5,
    marginVertical: Metrics.margin.regular,
    backgroundColor: Colors.appYellow,
    marginLeft: Metrics.margin.regular,
  },
  divider: {
    marginHorizontal: Metrics.margin.regular,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.h6,
  }
});

export default styles;
