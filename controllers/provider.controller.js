const Provider = require("../models/provider.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/artisanEmail');
const Cloudinary = require("../utils/artisanCloudinary");






exports.createProvider = async (req, res) =>{
    try {
        const { Name, Email, PhoneNumber, Profession, YearOfExperience, Address, ProfilePicture, JobPictures } = req.body;
        if(!( Name|| Email|| PhoneNumber)){
            return res.status(501).send("All field needed to be filled")
        };
        const existUser = await Provider.findOne({Email})
        if(existUser){
            return res.status(501).send("Your email exist in our database. Kindly login or use forgot password")
        };
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(Password, salt)
        const cloudinary = await Cloudinary.uploader.upload(req.file.path);

        const newUser = await Provider.create({
            Name,
            Email,
            PhoneNumber,
            Profession, 
            YearOfExperience, 
            Address, 
            ProfilePicture: cloudinary.secure_url, 
            });
       
        return res.status(201).send(newUser);
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "internal error"
        })
    }
};




exports.verifyEmail = async (req, res) => {
    try {
        const id  = req.params.id;
        const user = await Provider.findOne({ _id: id });
        if (user.isActive === true ) {
            return res.status(400).json({
                status: 'fail',
                message: 'You have already verified your account, Kindly login with your details',
                data: {
                    user
                },
            });
          };
          // update the user's status 
           await Provider.findByIdAndUpdate(
            { _id: user._id 
              
            },
            { $set: { isActive: true } },
            { new: true }        
            );
            await sendEmail({
                email: user.Email,
                subject: 'Account verification successful',
                message: `Your account has been verified successfully. You can now proceed to login
                <br>
                <div>
                    <h1>Hello ${user.Name}</h1> <br><br>
                    <h3> Here are your details below. </h3>
                    <h3>Email: ${user.Email} </h3>
                    <h3>Phone Number: ${user.PhoneNumber} </h3>
                

                    <p>Thanks you for partner with us.</p>
                    </div>`              
              });
        res.status(200).json({
            status: 'success',            
            message: 'User verified successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
  };



  
exports.userSignIn = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!(password && email)) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    const checkUser = await Provider.findOne({ email: email });
    if (!checkUser) {
      return res.status(404).json({ message: 'user not found' });
    }
    
    if (checkUser.isActive === false ) {
      return res.status(400).send({ message: 'Your account is still pending, check your email box to verify your email' });
    }
    
    const checkPassword = await bcrypt.compare(Password, checkUser.Password); 
    if (!checkPassword) {
        return res.status(400).json({ message: 'invalid credentials (Wrong email or Password)' });
    }
    const payload = {
      _id: checkUser._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    res.cookie('access-token', token);
    res.status(200).json({ message: 'user logged in successfully', user: checkUser, token: token });
      
  } catch (error) {
    return res.status(500).json({
        error: error.message, 
        message: 'internal server error' });
  }
};



exports.providerForm = async (req, res)=>{
    try {
        const id = req.user;
        const { Profession, YearOfExperience, Address, ProfilePicture, JobPictures} = req.body;
        const cloudinary = await Cloudinary.uploader.upload(req.file.path);
        const updateProvider = await Provider.findByIdAndUpdate(
            {
                _id: id
            },
            {
                Profession, 
                YearOfExperience, 
                Address, 
                ProfilePicture: cloudinary,
            },
            {
                new: true
            });
            return res.status(200).send("Your profile successfully updated")
    } catch (error) {
        return res.status(501).send({
            error: error.message,
            message: "internal server error"
        })
    }
}



exports.deleteProvider = async(req, res)=>{
    try {
        const id = req.user;
        if(id == null){
            return res.status(401).send("you are not login yet")
        }
        const user = await Provider.findByIdAndDelete(
            {
                id
            },
            {
                Name,
                Email,
                PhoneNumber,
                Profession, 
                YearOfExperience, 
                Address, 
                ProfilePicture, 
            }
            )
        return res.status(200).send({ status: "You have successfully deleted your profile", user });
    } catch (error) {
        return res.status({
            error: error.message,
            message: "internal error"
        })
    }
}




