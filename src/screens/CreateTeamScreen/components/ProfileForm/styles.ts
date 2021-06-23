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
    flex: 0.9,
    marginTop: Metrics.margin.regular,
  },
  profile: {
    width: 20,
    height: 20,
    borderRadius: Metrics.borderRadius.h5,
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
  },
  memberContainer: {
    padding: Metrics.margin.small,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Metrics.margin.regular,
    marginRight: Metrics.margin.regular,
    backgroundColor: Colors.overlay1,
    borderRadius: Metrics.borderRadius.regular - 2,
  },
  textMemberName: {
    marginLeft: Metrics.margin.regular,
  },
  buttonClose: {
    marginLeft: Metrics.margin.small,
  },
  buttonAdd: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  
});

export default styles;
