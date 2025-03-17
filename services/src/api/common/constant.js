module.exports.ROLES = {
    ADMINISTRATORS: 1,
    FORUM_MODERATORS: 2,
    REGISTERED: 3,
    GUESTS: 4,
    VENDORS: 5,
    CRM:6
  };
  
  module.exports.API_RESPONSE_STATUS_CODE = {
    FAILED: 0,
    SUCCESS: 1,
    NOT_FOUND: 2,
  };
  module.exports.API_RESPONSE_MESSAGES = {
    FAILED: "failed",
    SUCCESS: "success",
    SERVER_ERROR: "Server error",
    INVALID_EMAIL: "Invalid email",
    INVALID_MOBILE: "Invalid mobile number",
    USER_EXISTS: "User account already exists",
    SIGNUP_SUCCESS: "User account created successfully",
    INVALID_LOGIN_CREDENTIALS: "Invalid Username or Password",
    REQUIRED_EMAIL: "Email is required",
    ALREADY_EXISTS: "Already exists",
    NO_DATA_FOUND: "No data found",
    BAD_REQUEST: "Bad request"
  };
