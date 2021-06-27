import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../../themes';

const styles = StyleSheet.create({
  container: {
      marginHorizontal: Metrics.margin.very_huge,
      flexGrow: 1,
  },
  inputTask: {
    marginTop: Metrics.margin.huge,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Metrics.margin.regular,
  },
  imageMember: {
    width: 40,
    height: 40,
    marginRight: Metrics.margin.huge,
  },
  profile: {
    borderRadius: Metrics.borderRadius.h5,
    width: 40,
    height: 40,
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Metrics.margin.regular,
  },
  icDate: {
    width: 20,
    height: 20,
  },
  marginBottomSmall: {
    marginBottom: Metrics.margin.regular,
  },
  timeContainer: {
    flexDirection: 'row'
  },
  startTimeContainer: {
    width: '50%',
    paddingRight: Metrics.margin.regular,
  },
  endTimeContainer: {
    width: '50%',
    paddingLeft: Metrics.margin.regular,
  },
  boardContainer: {
    marginTop: Metrics.margin.regular,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  board: {
    padding: Metrics.margin.regular,
    marginTop: -Metrics.margin.small - 3,
    borderRadius: Metrics.margin.small,
  },
  boardView: {
    paddingVertical: Metrics.margin.small,
  },
  check: {
    width: 15,
    height: 15,
    backgroundColor: Colors.appGreen,
    borderRadius: 10,
    borderColor: Colors.appWhite,
    borderWidth: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  marginRight: {
    marginRight: Metrics.margin.regular,
  },
  buttonDone: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
});

export default styles;
