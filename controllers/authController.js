const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

const loginController = async(req,res)=>{
    try{
         const {email, password} = req.body
 
         const user = await User.findOne({email})
 
         if(!user){
             return res.status(404).json({message:"user does not exist"})
         }
 
         const passwordIsValid = await bcrypt.compare(password, user.password)
 
         if(!passwordIsValid){
             return res.status(401).json({message:'invalid username or password'})
         }
 
         const token = jwt.sign({id:user._id} , SECRET ,{expiresIn:'12h'})
 
         res.status(200).json({message:'login successful', username:user.username, token})
 
     }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
 }


 const signupController = async(req,res)=>{
    try{
        const {username, email, password} = req.body

        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(409).json({message:'Email already used'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({username: username, email:email, password:hashedPassword})
        const user = await newUser.save();

        res.status(201).json({message: 'your new account has been successfully created'})
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {loginController, signupController}