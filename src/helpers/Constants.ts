import { Platform } from 'react-native';
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
const UserType = {
  INTERNAL: 1,
  CUSTOMER: 2,
  MERCHANT: 3,
  PROVIDER: 4,
  CLIENT: 5,
  COLLABORATORS: 6,
};

const mockUserId = -143900;

const TestType = {
  screen: 0,
  sound: 1,
  movement: 2,
  connect: 3,
  hardware: 4,
  camera: 5,
};
const OrderStep = {
  health: 5,
  vehicle: 5,
};

const PaymentType = {
  cash: 0,
  prePay: 1,
  online: 2,
};
const InsuranceType = {
  HEALTH: 0,
  LIFE: 1,
  TRAVEL: 2,
  ACCIDENT: 3,
  LOAN: 4,
  ACCOUNT: 5,
  VEHICLE: 6,
  ELECTRONIC: 7,
};

const LocationStatus = {
  city: 0,
  district: 1,
  ward: 2,
};

const config = {
  clientId: 'Mobile',
  clientSecret: 'CpExNwQEyVeY3CD1jGtl2mj6OBdBllcG',
  grantType: 'client_credentials',
};

const TermType = {
  common: 0,
  excommunicate: 1,
  additional: 2,
};
const statusType = {
  urgent: 0,
  running: 1,
  ongoing: 2,
};
const ContractType = {
  INDIVIDUAL: 1,
  COMMERCE: 2,
  ALL: 0,
};

const Gender = {
  male: 0,
  female: 1,
  other: 2,
};

const IdentityType = {
  CMND: 0,
  CCCD: 1,
  Passport: 2,
};

const EDeviceIdentityType = {
  IMEI: 0,
  SERIAL: 1,
};
const InsuranceAdditionalType = {
  civil_liability: 1,
  god: 2,
  material: 3,
};
const Token = {
  accessToken: 'TOKEN',
};
//LOOKWORK

const DocumentType = {
  WORD: 0,
  PDF: 1,
  EXCEL: 2,
};

const DocumentFileType = {
  WORD: 'application/doc',
  PDF: 'application/pdf',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export {
  ApiResponseStatusCode,
  config,
  UserType,
  REQUEST_LIMIT,
  DocumentType,
  DocumentFileType,
  Token,
  androidOS,
  InsuranceType,
  OrderStep,
  TermType,
  LocationStatus,
  InsuranceAdditionalType,
  Gender,
  IdentityType,
  PaymentType,
  EDeviceIdentityType,
  ContractType,
  TestType,
  mockUserId,
  APIError,
  statusType,
};
