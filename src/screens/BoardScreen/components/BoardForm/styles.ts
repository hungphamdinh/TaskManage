import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../themes';

const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.margin.very_huge + 10,
  },
  container: {
      marginHorizontal: Metrics.margin.large,
      marginBottom: Metrics.screenHeight / 2,
  },
  profilePicture: {
      borderRadius: 40,
      width: 40,
      height: 40,
      backgroundColor: Colors.appPrimaryColor,
  },
  avatar: {
      width: 40,
      height: 40,
      borderRadius: Metrics.borderRadius.huge,
  },
  marginTopSmall: {
      marginTop: Metrics.margin.small,
  },
  date: {
    //   marginTop: Metrics.margin.large,
  },
  buttonAdd: {
      flexDirection: 'row',
      backgroundColor: Colors.sponsoredColor,
      padding: Metrics.margin.regular,
      alignItems: 'center',
      borderRadius: Metrics.borderRadius.regular,
  },
  body: {
    marginTop: Metrics.margin.very_huge + 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weekContainer: {
    borderBottomWidth: 1,
    paddingBottom: Metrics.margin.regular,
  },
  divider: {
    borderBottomColor: Colors.overlay1,
    marginTop: -1,
    borderBottomWidth: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default styles;
