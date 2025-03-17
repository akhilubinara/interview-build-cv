const { createUser, getUserList, getUserDetails, updateUser } = require('../api/controllers/common.controller')
const router = require('express').Router();


router.post('/create-user', createUser);
router.post('/update-user', updateUser);
router.get('/get-user-list', getUserList);
router.get('/get-user-details', getUserDetails);

module.exports = router