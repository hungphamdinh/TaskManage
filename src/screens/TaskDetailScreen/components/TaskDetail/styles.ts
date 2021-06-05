import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../themes';

const styles = StyleSheet.create({
  header: {
      alignItems: 'center',
  },
  container: {
      marginHorizontal: Metrics.margin.huge,
      marginBottom: Metrics.screenHeight / 2,
  },
  title: {
    marginVertical: Metrics.margin.large,
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
  timeCreated: {
    marginTop: Metrics.margin.large,
  },
  team: {
    flexGrow: 0.5,
  },
  mainInfoContainer: {
    marginBottom: Metrics.margin.large,
    flexDirection: 'row',
    flexGrow: 1,
  },
  estContainer: {
    flexGrow: 0.5,
  },
  tasks: {
  },
  addSubTask: {
    flexDirection: 'row',
    marginTop: Metrics.margin.small,
    marginBottom: Metrics.margin.large,
    justifyContent: 'space-between',
  },
  buttonAdd: {
    backgroundColor: Colors.buttonIconColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: Metrics.borderRadius.medium,
  }
});

export default styles;
