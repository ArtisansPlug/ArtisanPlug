const User = require("../models/user.models")
const jwt = require('jsonwebtoken');

 const authenticate = async(req, res, next)=>{
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?._id);
                req.user = user;
                next();
            }

        }catch(error){
            return res.status(400).json("Not authorized token or token expired, Please try login again")
        }
    }else{
        return res.status(400).json("There is no token attached to the header")
    }
};

const isAdmin = async(req, res, next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if (adminUser.role.toLowerCase() !== "admin"){
        return res.status(400).json("you are not authorized to carryout this action, contact admin")
    }else{
     next();
    }
}

module.exports = {authenticate, isAdmin}