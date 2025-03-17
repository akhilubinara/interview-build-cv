const { createUser, getUserList, getUserDetails } = require('../api/controllers/common.controller')
const router = require('express').Router();


router.post('/create-user', createUser);
router.get('/get-user-list', getUserList);
router.get('/get-user-details', getUserDetails);

module.exports = router