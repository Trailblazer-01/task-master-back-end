const express = require('express')
const User = require('../models/user')
const {loginController, signupController} = require('../controllers/authController')
const router = express.Router()
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const {checkSchema} = require('express-validator')
const {signupValidation, loginValidation, validateRequest} = require("../validation")

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) {
        return res.status(403).json({message:"Go back to login page"});
    }

    jwt.verify(token,SECRET, async (err, user) => {
        if (err) return res.status(403).json({ message: 'Unauthorized. Go back to login' });
        const existingUser = await User.findById(user.id)

        if(!existingUser) return res.status(404).json({message:'user does not exist'})
        req.userId = user.id;
        next()
    });
}

//the route for your login page. After you deploy this backend, it becomes https://your-site-url/api/auth/login
router.post('/login',checkSchema(loginValidation),validateRequest,loginController) 

//the route for your signup page. After you deploy this backend, it becomes https://your-site-url/api/auth/signup
router.post('/signup',checkSchema(signupValidation),validateRequest,signupController)

module.exports = router
module.exports.verifyToken = verifyToken
