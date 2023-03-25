const Request = require('../models/request.model');
const sendEmail = require('../utils/artisanEmail');
const User = require("../models/user.models");





exports.alertMessage = async(req, res)=>{
    try {
        const id = req.user;
        const user = await User.findOne({ id });
        const { email, message, requestTitle } = req.body;
        const existingEmail = await User.findOne({ email })
        if(existingEmail){
            const alertRequest = await Request.create({
                userId: user.id,
                message,
                requestTitle
            })
            await sendEmail({
                email: existingEmail.email,
                subject: `${alertRequest.requestTitle}`,
                message: `Hello ${existingEmail.Name},
                ${user.Name} has request for ${alertRequest.message}, <br>`  

            });
            return res.status(201).send("Your request has been sent")
        }
       
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "internal error"
        })
    }
};