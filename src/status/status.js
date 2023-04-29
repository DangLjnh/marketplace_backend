const statusUser = {
  ACTIVE: 1,
  PENDING: 2,
  BLOCK: 3,
};

const groupAccess = {
  CUSTOMER: 1,
};

const loginMethod = {
  LOCAL: 1,
  FACEBOOK: 1,
  GOOGLE: 1,
};

const errorCode = {
  ERROR_SERVER: -1,
  SUCCESS: 0,
  ERROR_PARAMS: 1,
};

module.exports = { statusUser, groupAccess, errorCode, loginMethod };
