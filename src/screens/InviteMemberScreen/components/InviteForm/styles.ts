import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../themes';

const styles = StyleSheet.create({
  container: {
      marginHorizontal: Metrics.margin.very_huge,
      flexGrow: 1,
  },
  inputTask: {
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.regular,
    padding: Metrics.margin.large,
    marginTop: Metrics.margin.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamContainer: {
    // marginTop: Metrics.margin.large,
  },
  imageMember: {
    borderRadius: Metrics.borderRadius.h5,
    backgroundColor: Colors.appPrimaryColor,
    width: 40,
    height: 40,
    marginRight: Metrics.margin.huge,
  },
  buttonAdd: {
    borderRadius: Metrics.borderRadius.h5,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.appPrimaryColor,
    marginRight: Metrics.margin.huge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icSearch: {
    backgroundColor: Colors.appSecondaryColor,
    height: 30,
    width: 30,
    borderRadius: Metrics.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDone: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  itemContainer: {
    padding: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.medium,
    marginTop: Metrics.margin.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageProfileContainer: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.large,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  roleContainer: {
    marginLeft: Metrics.margin.regular,
  },
  marginTopSmall: {
    marginTop: Metrics.margin.tiny,
  }
});

export default styles;
