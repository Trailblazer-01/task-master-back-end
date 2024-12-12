const express = require('express')
const router = express.Router();
const {verifyToken} = require('./auth')
const {deleteUser} = require('../controllers/userController')

//the route to delete a user. After you deploy this backend, it becomes https://your-site-url/api/user/delete
router.delete('/user/delete',verifyToken,deleteUser)

module.exports = router
