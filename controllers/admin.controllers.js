const User = require("../models/user.models");
const fs = require("fs");

// exports.SwitchToAdmin = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.role = "admin";
//     await user.save();
//     return res.status(200).json({ message: "User role changed to admin" });
//   } catch (error) {
//     logger.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

exports.SwitchToAdmin = async(req,res)=>{
  const {id} = req.params;
  try{
      const user = await User.findByIdAndUpdate(
          id,
          {
              role: "admin"
          },
          {new: true}
      )
      if (!user) {
         return res.status(404).json({ message: "User not found" });
             }
      return res.status(200).json({
          message:"user role changed to admin successfully"
          
      })
  }catch(error){
      throw new Error(error)
  }    
};



exports.AllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};


exports.countUsersAndArtisans = async (req, res) => {
  try {

    const userCount = await User.countDocuments({ role: "user" });
    const providerCount = await User.countDocuments({ role: "provider" });
    const adminCount = await User.countDocuments({ role: "admin" });

    return res.status(200).json({
      userCount,
      providerCount,
      adminCount
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const artisan = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!artisan) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error while deleting User", error);
    return res.status(500).json({ message: "Server error" });
  }
};