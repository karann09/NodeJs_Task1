const Joi = require("joi")
const userRegisterValidation = (req, res, next)=>{
    const schema = Joi.object({
        username: Joi.string().min(3).max(10),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).alphanum().required()
    });
    const {error, value} =schema.validate(req.body)
    if(error){
        return res.status(400).json({message: "Bad Request", error})
    }
    next();
}

const userLoginValidation = (req, res, next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).alphanum().required()
    });
    const {error, value} =schema.validate(req.body)
    if(error){
        return res.status(400).json({message: "Bad Request", error})
    }
    next();
}

module.exports = {
    userRegisterValidation,
    userLoginValidation
}