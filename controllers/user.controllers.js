const User = require("../models/user.models");
const Provider = require("../models/provider.models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cloudinary = require("../utils/cloudinary");
const { passwordHash, passwordCompare } = require("../helper/hashing");

exports.SignUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  try {
    if (!(fullName && password && email)) {
      return res.status(400).json({ message: "All input is required" });
    }
    const hashedPassword = await passwordHash(password);
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({ message: "User already exists." }); // this condition needs to be stopped if error is thrown
    }
    const user = await User.create({
      fullName,
      password: hashedPassword,
      email,
    });
    //   await user.generateAuthToken();
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.Login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await passwordCompare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // generate token
    const token = await user.generateAuthToken();
    if (rememberMe) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
    } else {
      req.session.cookie.expires = false;
    }
    req.session.token = token;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.UploadImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user",
      width: 150,
      crop: "scale",
    });
    // resize image using sharp use path.join()
    // const resizedImage = await sharp(req.file.path)
    //   .resize(150, 150)
    //   .toFile(`./public/images/${req.file.filename}.png`);

    // save image to user model
    user.profilePicture = result.secure_url;

    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.EditUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "username",
    "email",
    "password",
    "address",
    "phoneNumber",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).json({ message: "Invalid updates" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.SearchForProviders = async (req, res) => {
  const { keyword } = req.query;
  try {
    const user = await Provider.find({
      $or: [
        { fullName: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        // { ratings: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.AddFavoriteArtisan = async (req, res) => {
  try {
    providerId = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { favoriteProvider: providerId },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Favorite Artisan Added", updateUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.Request = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const provider = await Provider.findById(req.params.id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: "boluwatifefred@gmail.com",
      to: provider.email,
      subject: ` You Just Got A Request On Plug`,
      html: `
    <p>${user.fullName} just sent you a request</p>
    <p>Login to the app to confirm this request or contact the user with the line ${user.phoneNumber} or email ${user.email}</p>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log("Email Sent to " + info.accepted);
    });
    return res.status(200).json({ message: "Request Sent To Provider" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.Feedback = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id);
    // if (!user) {
    //   return res.status(404).json({ message: "user not found" });
    // }
    // const fullName = user.fullName;
    const {userReviews }= req.body;
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      {
         $push: { reviews: userReviews},

      
      },
      { new: true }
    );
    return res
    .status(200)
    .json({ message: "Review Added", provider });
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
};
exports.Rating = async (req, res) => {
  try {
    const {userRating }= req.body;
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      {
         $push: { ratings: userRating},

      
      },
      { new: true }
    );
    return res
    .status(200)
    .json({ message: "Review Added", provider });
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
};
