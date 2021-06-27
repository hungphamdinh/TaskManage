import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../themes';

const styles = StyleSheet.create({
  header: {
      alignItems: 'center',
      marginTop: Metrics.margin.large,
  },
  container: {
      marginHorizontal: Metrics.margin.huge,
      // backgroundColor: 'red',
  },
  avatar: {
    marginTop: Metrics.margin.regular,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appLightGrayColor,
    borderRadius: Metrics.borderRadius.h5,
  },
  imageAvatar: {
    width: 70,
    height: 70,
    borderRadius: Metrics.borderRadius.h5,
  },
  title: {
    marginVertical: Metrics.margin.regular,
  },
  description: {
    marginBottom: Metrics.margin.large,
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
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Metrics.margin.regular,
  },
  team: {
    flexGrow: 0.5,
  },
  mainInfoContainer: {
    marginTop: Metrics.margin.large,
    marginBottom: Metrics.margin.regular,
  },
  tasks: {
  },
  addSubTask: {
    flexDirection: 'row',
    marginTop: Metrics.margin.small,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonAdd: {
    backgroundColor: Colors.buttonIconColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: Metrics.borderRadius.medium,
  },
  taskContainer: {
    maxHeight: Metrics.screenHeight / 3.5,
  },
  buttonSetting: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconSetting: {
    width: 30,
    height: 30,
  },
  textSetting: {
    marginLeft: Metrics.margin.regular,
  }
});

export default styles;
