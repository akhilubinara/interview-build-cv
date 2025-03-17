const {
    API_RESPONSE_STATUS_CODE,
    API_RESPONSE_MESSAGES,
  } = require("../common/constant");
const { _createUser, _getUserList, _getUserDetails } = require("../services/common.service");

module.exports = {
  createUser: async (req, res) => {

    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        education: req.body.education,
        workExperience: req.body.workExperience,
        skills: req.body.skills,
    }

    if (!data.name || !data.email || !data.phone || !data.description || !data.skills ) {
        return res.status(401).json({
          status: API_RESPONSE_STATUS_CODE.FAILED,
          message: API_RESPONSE_MESSAGES.BAD_REQUEST,
          data: null,
        });
    }

    const result = await _createUser(data);

    if (result.success) {
        return res.status(200).json({
          status: API_RESPONSE_STATUS_CODE.SUCCESS,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          status: API_RESPONSE_STATUS_CODE.FAILED,
          message: result.message,
          data: null,
        });
      }
  },
  getUserList: async (req, res) =>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
     const result = await _getUserList(page, limit);

     if(result.success){
     return res.status(200).json({
          status: API_RESPONSE_STATUS_CODE.SUCCESS,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          status: API_RESPONSE_STATUS_CODE.FAILED,
          message: result.message,
          data: null,
        });
      }
  },
  getUserDetails: async (req, res) =>{
    const userId = req.query.userId;

    if ( !userId ) {
        return res.status(401).json({
          status: API_RESPONSE_STATUS_CODE.FAILED,
          message: API_RESPONSE_MESSAGES.BAD_REQUEST,
          data: null,
        });
    }

     const result = await _getUserDetails(userId);

     if(result.success){
     return res.status(200).json({
          status: API_RESPONSE_STATUS_CODE.SUCCESS,
          message: result.message,
          data: result.data,
        });
      } else {
        return res.status(400).json({
          status: API_RESPONSE_STATUS_CODE.FAILED,
          message: result.message,
          data: null,
        });
      }
  },
}



