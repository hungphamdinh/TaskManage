import { StyleSheet } from 'react-native';
import { Metrics, Colors, Styles } from '../../../../../themes';

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
  buttonShowDropdown: {
    flexDirection: 'row',
    backgroundColor: Colors.appPrimaryColor,
    padding: Metrics.margin.regular,
    alignItems: 'center',
    borderRadius: Metrics.borderRadius.regular,
  },
  textDropdown: {
    marginRight: Metrics.margin.regular,
  },
  dropdown: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.very_huge,
    paddingVertical: Metrics.margin.regular,
    position: "absolute",
    margin: Metrics.margin.regular,
    top: Metrics.screenHeight / 8,
    right: 5,
    zIndex: 1,
    borderRadius: Metrics.borderRadius.regular,
    ...Styles.shadow
  },
  itemDropdown: {
    padding: Metrics.margin.small,
  },
  buttonInvitation: {
    marginRight: Metrics.margin.huge,
    flexDirection: 'row',
  },
  count: {
    position: "absolute",
    width: 15,
    height: 15,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.overlay6,
    borderRadius: Metrics.borderRadius.large,
  },
  headerRight: {
    flexDirection: 'row',
  },
});

export default styles;
