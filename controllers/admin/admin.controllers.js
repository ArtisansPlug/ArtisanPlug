const User = require("../../models/user.models");
const Alert = require("../../models/alert.models")
const Provider = require("../../models/provider.model");
const fs = require("fs");


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
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message:"All users on the database", users:user });
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};

exports.AllProviders = async (req, res) => {
  try {
    const user = await Provider.find();
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No provider found" });
    }
    return res.status(200).json({ message:"All providers on the database", users:user });
  } catch (error) {

    return res.status(500).json({ message: error.message });
  }
};


exports.countUsersAndArtisans = async (req, res) => {
  try {

    const userCount = await User.countDocuments({ role: "user" });
    const providerCount = await Provider.countDocuments({ Email: { $ne: "" } });
    const adminCount = await User.countDocuments({ role: "admin" });

    return res.status(200).json({
      message:"Here the breakdown of Users on the platform",
      numberOfUsers:userCount,
      numberOfProviders:providerCount,
      numberOfAdmin:adminCount
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

exports.createAlert = async(req, res) => {
  try{
  const newAlert = await Alert.create(req.body)
  return res.status(200).json({ message: "Alert created successfully", newAlert});
}catch(error){
  console.error("Error while adding a new alert", error);
  return res.status(500).json({ message: "Server error" });
}
}

exports.fetchAllAlerts = async(req, res) => {
  try{
    const allAlert = await Alert.find()
    return res.status(200).json({ message: "Alerts fetched successfully", allAlert});
  }catch(error){
    console.error("Error while fetching Users", error);
    return res.status(500).json({ message: "Server error" });
  }
}

exports.fetchActiveAlerts = async(req, res) => {
  try{
    const active = await Alert.find({isActive:true})
    if(!active || active.length === 0){
      return res.status(400).json({ message: "no active alerts available", active});
    }
    return res.status(200).json({ message: "Alerts fetched successfully", active});
  }catch(error){
    console.error("Error while fetching active Users", error);
    return res.status(500).json({ message: "Server error" });
  }
}
