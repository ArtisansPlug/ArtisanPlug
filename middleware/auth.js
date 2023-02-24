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
            //throw new Error("Not authorized token or token expired, Please try login again")
            return res.status(400).json("Not authorized token or token expired, Please try login again")
        }
    }else{
        //throw new Error("There is no token attached to the header")
        return res.status(400).json("There is no token attached to the header")
    }
};

const isAdmin = async(req, res, next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if (adminUser.role.toLowerCase() !== "admin"){
        //throw new Error("you are not an admin")
        return res.status(400).json("you are not authorized to carryout this action, contact admin")
    }else{
     next();
    }
}

module.exports = {authenticate, isAdmin}