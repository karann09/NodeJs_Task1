const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const jwt = require("jsonwebtoken");

module.exports ={
    //validate req.body -done
    //create MongoDB userModel -done
    //db password encryption
    //save data to mongodb
    //return response to the client
    registerUser: async (req,res)=>{
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password,10);
        try {
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({message: 'success', data: response});
        } catch (error) {
            return res.status(500).json({message: 'error', error});
        }
    },
    
    loginUser: async(req, res)=>{
      try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json({message: "Auth failed, Invalid username or password"});
        }
        const isPassEqual = await bcrypt.compare(req.body.password, user.password);
        if(!isPassEqual){
            return res.status(401).json({message: "Auth failed, Invalid username or password"});
        }

        const tokenObject = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn: '2h'});
        return res.status(200).json({jwtToken, tokenObject});
      } catch (error) {
        return res.status(500).json({message: 'error', error});
      }  
    }
}