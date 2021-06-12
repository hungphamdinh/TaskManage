import { Platform } from 'react-native';
import { Colors } from '../themes';
const ApiResponseStatusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
};

const androidOS = Platform.OS === 'android';
const REQUEST_LIMIT = 5;
const APIError = {
  Network: 'Network Error',
  NoResponse: 'No response was received',
};
const statusType = {
  urgent: 0,
  running: 1,
  ongoing: 2,
  done: 3,
};

const statuses = [
  {
    id: statusType.urgent,
    name: 'Urgent',
    color: '#fcddd7',
    textColor: Colors.sponsoredColor,
    isActive: true,
  },
  {
    id: statusType.running,
    name: 'Running',
    color: Colors.appGreen,
    textColor: Colors.appWhite,
    isActive: false,
  },
  {
    id: statusType.ongoing,
    name: 'OnGoing',
    color: '#d2d1f0',
    textColor: Colors.appPrimaryColor,
    isActive: false,
  }
]

const statusesDetail = [
  {
    id: statusType.urgent,
    name: 'Urgent',
    color: '#fcddd7',
    textColor: Colors.sponsoredColor,
    isActive: true,
  },
  {
    id: statusType.running,
    name: 'Running',
    color: Colors.appGreen,
    textColor: Colors.appWhite,
    isActive: false,
  },
  {
    id: statusType.ongoing,
    name: 'OnGoing',
    color: '#d2d1f0',
    textColor: Colors.appPrimaryColor,
    isActive: false,
  },
  {
    id: statusType.done,
    name: 'Done',
    color: Colors.appWhite,
    textColor: Colors.appBlue,
    isActive: false,
  }
]


export {
  ApiResponseStatusCode,
  REQUEST_LIMIT,
  androidOS,
  APIError,
  statusType,
  statuses,
  statusesDetail,
};
