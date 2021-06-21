import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../../themes';

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
    width: 30,
    height: 30,
  },
  buttonDone: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  header: {
    marginTop: Metrics.margin.large,
    alignItems: 'center',
  },
  buttonUpload: {
    width: 80,
    height: 80,
    borderRadius: Metrics.borderRadius.h5,
    backgroundColor: Colors.overlay1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.h5,
  },
  title: {
    marginVertical: Metrics.margin.regular,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Metrics.margin.small,
  }
});

export default styles;
