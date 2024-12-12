const User = require('../models/user')

const deleteUser = async(req,res)=>{
    try{
      const {userId} = req
      const result = await User.findOneAndDelete({_id:userId})

      if (result) {
        res.status(200).json({message:'User deleted:', result});
      } else {
        res.status(404).json({message:'No user found with the given ID'});
      }
    }catch(error){
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {deleteUser}