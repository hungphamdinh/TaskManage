import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../themes';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.overlay3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.margin.large,
  },
  modal: {
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.regular,
    // borderRadius: Metrics.borderRadius.regular,
    width: Metrics.screenWidth * 0.8,
    // marginBottom: 50,
    maxHeight: Metrics.screenHeight * 0.7,
  },
  modalContent: {
    paddingHorizontal: Metrics.margin.very_huge,
    paddingTop: Metrics.margin.regular,
  },
  title: {
    marginTop: Metrics.margin.regular,
    marginBottom: Metrics.margin.regular,
  },
  content: {
    marginTop: Metrics.margin.regular,
  },
  buttonAccept: {
    padding: Metrics.margin.large,
    alignItems: 'center',
    // flex: 1,
    // marginTop: Metrics.margin.very_huge + 10,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  buttonUpload: {
    borderRadius: Metrics.borderRadius.h5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.h5,
  },
});

export default styles;
