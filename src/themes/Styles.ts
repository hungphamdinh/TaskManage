import Colors from './Colors';
import Metrics from './Metrics';

const ApplicationStyles: any = {
  fullScreenContainer: {
    flex: 1,
    marginTop: Metrics.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.appBackgroundColor,
  },
  containerGrow: {
    flexGrow: 1,
  },
  lightContainer: {
    flexGrow: 1,
    backgroundColor: Colors.appWhite,
  },
  radiusContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: Metrics.borderRadius.medium,
    borderTopRightRadius: Metrics.borderRadius.medium,
    marginTop: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.regular,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
};
export default ApplicationStyles;
